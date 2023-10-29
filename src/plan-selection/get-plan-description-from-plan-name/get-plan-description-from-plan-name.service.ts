import { Injectable } from '@nestjs/common';
import { GetPlanDescriptionFromPlanNameStatusConstants } from './get-plan-description-from-plan-name-status.constants';
import { GetPlanDescriptionFromPlanNameRequestDto } from './get-plan-description-from-plan-name-request.dto';
import { GetPlanDFescriptionFromPlanNameException } from './get-plan-description-from-plan-name.exception';
import { IGetPlanDescriptionFromPlanNameResponse } from './get-plan-description-from-plan-name-response.interface';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';

@Injectable()
export class GetPlanDescriptionFromPlanNameService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  // TODO: Determinar origen del parámetro de entrada: l_CltInstanceid
  async getPlanDescriptionFromPLanName(
    dto: GetPlanDescriptionFromPlanNameRequestDto,
  ): Promise<IGetPlanDescriptionFromPlanNameResponse> {
    try {
      await super.connect();
      const parameters = {
        l_CltInstanceid: OracleHelper.numberBindIn(dto.customerInstanceId),
        d_amount: OracleHelper.numberBindOut(),
        status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.ACT_PACKAGE,
        OracleConstants.GET_PLAN_DESCRIPTION_FROM_PLAN_NAME,
        parameters,
      );
      const response: IGetPlanDescriptionFromPlanNameResponse = {
        amount: result?.outBinds?.d_amount,
        status: (result?.outBinds?.status ??
          GetPlanDescriptionFromPlanNameStatusConstants.INTERNAL_ERROR) as GetPlanDescriptionFromPlanNameStatusConstants,
      };
      switch (response.status) {
        case GetPlanDescriptionFromPlanNameStatusConstants.SUCCESSFULL:
          return response;
        case GetPlanDescriptionFromPlanNameStatusConstants.INTERNAL_ERROR:
          throw new GetPlanDFescriptionFromPlanNameException();
        case GetPlanDescriptionFromPlanNameStatusConstants.THERE_IS_NO_DATA:
          return response;
        default:
          throw new GetPlanDFescriptionFromPlanNameException();
      }
    } catch (error) {
      super.exceptionHandler(error);
    } finally {
      await this.closeConnection();
    }
  }
}
