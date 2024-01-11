import { Injectable } from '@nestjs/common';
import { ArrayHelper } from 'src/system/infrastructure/helpers/array.helper';
import { BossConstants } from 'src/boss/boss.constants';
import { IPlansByCustomerClassRawResponse } from './plans-by-customer-class-raw-response.interface';
import { IPlansByCustomerClassListResponse } from './plans-by-customer-class-list-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { PlansByCustomerClassRequestDto } from './plans-by-customer-class-request.dto';
import { PlansByCustomerClassStatusConstants } from './plans-by-customer-class-status.constants';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class PlansByCustomerClassRawService extends OracleExecuteStoredProcedureRawService<
  PlansByCustomerClassRequestDto,
  IPlansByCustomerClassListResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.BOSS_PACKAGE,
      BossConstants.PLAN_BY_CUSTOMER_CLASS,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: PlansByCustomerClassRequestDto): any {
    return {
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
  }

  protected getResponse(result: any): IPlansByCustomerClassListResponse {
    const rawResponse = {
      plan: OracleHelper.getItems(result, 'O_PLAN'),
      planDesired: OracleHelper.getItems(result, 'O_PLANDESIRED'),
      shortName: OracleHelper.getItems(result, 'O_SHORTNAME'),
      monthlyFee: OracleHelper.getItems(result, 'O_MONTHLYFEE'),
      downStream: OracleHelper.getItems(result, 'O_DOWNSTREAM'),
      limit: OracleHelper.getItems(result, 'O_LIMITE'),
      additionalMB: OracleHelper.getItems(result, 'O_MB_ADICIONAL'),
      status: (OracleHelper.getFirstItem(result, 'O_STATUS') ??
        PlansByCustomerClassStatusConstants.ERROR) as PlansByCustomerClassStatusConstants,
    };
    return this.rawToListResponse(rawResponse);
    // switch (response.status) {
    //   case PlanByCustomerClassStatusConstants.SUCCESSFULL:
    //     return response;
    //   case PlanByCustomerClassStatusConstants.ERROR:
    //     throw new PlanByCustomerClassException();
    //   case PlanByCustomerClassStatusConstants.THERE_IS_NO_DATA:
    //     return response;
    //   default:
    //     throw new PlanByCustomerClassException();
    // }
  }

  private rawToListResponse(
    rawResponse: IPlansByCustomerClassRawResponse,
  ): IPlansByCustomerClassListResponse {
    const response: IPlansByCustomerClassListResponse = {
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
        plan: ArrayHelper.getValue(rawResponse.plan, index),
        planDesired: ArrayHelper.getValue(rawResponse.planDesired, index),
        shortName: ArrayHelper.getValue(rawResponse.shortName, index),
        monthlyFee: ArrayHelper.getValue(rawResponse.monthlyFee, index),
        downStream: ArrayHelper.getValue(rawResponse.downStream, index),
        limit: ArrayHelper.getValue(rawResponse.limit, index),
        additionalMB: ArrayHelper.getValue(rawResponse.additionalMB, index),
      });
      response.count = response.items.length;
    }
    return response;
  }
}
