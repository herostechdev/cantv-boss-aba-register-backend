import { Injectable } from '@nestjs/common';
import { IPlanByClassClientRawResponse } from './plan-by-class-client-raw-response.interface';
import { IPlanByClassClientListResponse } from './plan-by-class-client-list-response.interface';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { PlanByClassClientRequestDto } from './plan-by-class-client-request.dto';
import { PlanByClassClientStatusConstants } from './plan-by-class-client-status.constants';
import { PlanByClassClientException } from './plan-by-class-client.exception';
import { ArrayHelper } from 'src/system/infrastructure/helpers/array.helper';

@Injectable()
export class PlanByClassClientService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async getPlanByClassClient(
    dto: PlanByClassClientRequestDto,
  ): Promise<IPlanByClassClientListResponse> {
    try {
      await super.connect();
      const parameters = {
        I_CLASSCLIENT: OracleHelper.stringBindIn(dto.customerClassName),
        I_DSLAMPORTID: OracleHelper.numberBindIn(dto.dslamPortId),
        I_WSCONTRACT: OracleHelper.numberBindIn(0),
        I_WS3CONTRACT: OracleHelper.stringBindIn('0'),
        I_LOGINDIALUP: OracleHelper.stringBindIn(null),
        I_SAMPLING: OracleHelper.stringBindIn('0'),
        I_UNETEALMEGA: OracleHelper.stringBindIn('0'),
        I_SPECIALCASE: OracleHelper.stringBindIn('0'),
        I_INTERNETEQUIPADO: OracleHelper.stringBindIn('-1'),
        I_LOGININSTALADOR: OracleHelper.stringBindIn(dto.installerLogin),
        I_AREACODE: OracleHelper.stringBindIn(dto.areaCode),
        I_PHONENUMBER: OracleHelper.stringBindIn(dto.phoneNumber),

        O_PLAN: OracleHelper.tableOfStringBindOut(),
        O_PLANDESIRED: OracleHelper.tableOfStringBindOut(),
        O_SHORTNAME: OracleHelper.tableOfStringBindOut(),
        O_MONTHLYFEE: OracleHelper.tableOfStringBindOut(),
        O_DOWNSTREAM: OracleHelper.tableOfStringBindOut(),
        O_LIMITE: OracleHelper.tableOfStringBindOut(),
        O_MB_ADICIONAL: OracleHelper.tableOfStringBindOut(),
        O_STATUS: OracleHelper.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        BossConstants.BOSS_PACKAGE,
        BossConstants.PLAN_BY_CUSTOMER_CLASS,
        parameters,
      );
      const rawResponse: IPlanByClassClientRawResponse = {
        plan: OracleHelper.getItems(result, 'O_PLAN'),
        planDesired: OracleHelper.getItems(result, 'O_PLANDESIRED'),
        shortName: OracleHelper.getItems(result, 'O_SHORTNAME'),
        monthlyFee: OracleHelper.getItems(result, 'O_MONTHLYFEE'),
        downStream: OracleHelper.getItems(result, 'O_DOWNSTREAM'),
        limit: OracleHelper.getItems(result, 'O_LIMITE'),
        additionalMB: OracleHelper.getItems(result, 'O_MB_ADICIONAL'),
        status: (OracleHelper.getFirstItem(result, 'O_STATUS') ??
          PlanByClassClientStatusConstants.ERROR) as PlanByClassClientStatusConstants,
      };
      const response = this.rawToListResponse(rawResponse);
      switch (response.status) {
        case PlanByClassClientStatusConstants.SUCCESSFULL:
          return response;
        case PlanByClassClientStatusConstants.ERROR:
          throw new PlanByClassClientException();
        case PlanByClassClientStatusConstants.THERE_IS_NO_DATA:
          return response;
        default:
          throw new PlanByClassClientException();
      }
    } catch (error) {
      super.exceptionHandler(error);
    } finally {
      await this.closeConnection();
    }
  }

  private rawToListResponse(
    rawResponse: IPlanByClassClientRawResponse,
  ): IPlanByClassClientListResponse {
    const response: IPlanByClassClientListResponse = {
      items: [],
      count: 0,
      status: 0,
    };
    if (!rawResponse || !ArrayHelper.isArrayWithItems(rawResponse.plan)) {
      return response;
    }
    response.status = rawResponse.status;
    for (let index = 0; index < rawResponse.plan.length; index++) {
      response.items.push({
        plan: this.getValue(rawResponse.plan, index),
        planDesired: this.getValue(rawResponse.planDesired, index),
        shortName: this.getValue(rawResponse.shortName, index),
        monthlyFee: this.getValue(rawResponse.monthlyFee, index),
        downStream: this.getValue(rawResponse.downStream, index),
        limit: this.getValue(rawResponse.limit, index),
        additionalMB: this.getValue(rawResponse.additionalMB, index),
      });
      response.count = response.items.length;
    }
    return response;
  }

  private getValue(values: string[], index: number): string {
    if (!Array.isArray(values) || values.length === 0) {
      return '';
    }
    if (index >= 0 && values.length > index) {
      return values[index];
    }
    return '';
  }
}
