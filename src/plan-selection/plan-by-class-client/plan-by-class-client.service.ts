import { Injectable } from '@nestjs/common';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { PlanByClassClientRequestDto } from './plan-by-class-client-request.dto';
import { PlanByClassClientStatusConstants } from './plan-by-class-client-status.constants';
import { PlanByClassClientException } from './plan-by-class-client.exception';
import { IPlanByClassClientResponse } from './plan-by-class-client-response.interface';

@Injectable()
export class PlanByClassClientService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  // TODO: Determinar origen de todos los parámetros de entrada (DTO)
  async getPlanByClassClient(
    dto: PlanByClassClientRequestDto,
  ): Promise<IPlanByClassClientResponse> {
    try {
      await super.connect();
      const parameters = {
        I_CLASSCLIENT: OracleHelper.stringBindIn(dto.classCustomer),
        I_DSLAMPORTID: OracleHelper.numberBindIn(dto.dslamPortId),
        I_WSCONTRACT: OracleHelper.numberBindIn(dto.wsContract),
        I_WS3CONTRACT: OracleHelper.stringBindIn(dto.ws3Contract),
        I_LOGINDIALUP: OracleHelper.stringBindIn(dto.loginDialup),
        I_SAMPLING: OracleHelper.stringBindIn(dto.sampling),
        I_UNETEALMEGA: OracleHelper.stringBindIn(dto.uneteAlMega),
        I_SPECIALCASE: OracleHelper.stringBindIn(dto.specialCase),
        I_INTERNETEQUIPADO: OracleHelper.stringBindIn(dto.internetEquipado),
        I_LOGININSTALADOR: OracleHelper.stringBindIn(dto.loginDialup),
        I_AREACODE: OracleHelper.stringBindIn(dto.areaCode),
        I_PHONENUMBER: OracleHelper.stringBindIn(dto.phoneNumber),

        O_PLAN: OracleHelper.tableOfStringBindOut(532),
        O_PLANDESIRED: OracleHelper.tableOfStringBindOut(532),
        O_SHORTNAME: OracleHelper.tableOfStringBindOut(532),
        O_MONTHLYFEE: OracleHelper.tableOfStringBindOut(532),
        O_DOWNSTREAM: OracleHelper.tableOfStringBindOut(532),
        O_LIMITE: OracleHelper.tableOfStringBindOut(532),
        O_MB_ADICIONAL: OracleHelper.tableOfStringBindOut(532),
        O_STATUS: OracleHelper.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.ACT_PACKAGE,
        OracleConstants.PLAN_BY_CLAS_CLIENT,
        parameters,
      );
      const response: IPlanByClassClientResponse = {
        plan: OracleHelper.getFirstItem(result, 'O_PLAN'),
        planDesired: OracleHelper.getFirstItem(result, 'O_PLANDESIRED'),
        shortName: OracleHelper.getFirstItem(result, 'O_SHORTNAME'),
        monthlyFee: OracleHelper.getFirstItem(result, 'O_MONTHLYFEE'),
        downStream: OracleHelper.getFirstItem(result, 'O_DOWNSTREAM'),
        limit: OracleHelper.getFirstItem(result, 'O_LIMITE'),
        additionalMB: OracleHelper.getFirstItem(result, 'O_MB_ADICIONAL'),
        status: (result?.outBinds?.status ??
          PlanByClassClientStatusConstants.ERROR) as PlanByClassClientStatusConstants,
      };
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
}
