import { Injectable } from '@nestjs/common';
import { GetPlanDescriptionFromPlanNameStatusConstants } from './get-plan-description-from-plan-name-status.constants';
import { GetPlanDescriptionFromPlanNameRequestDto } from './get-plan-description-from-plan-name-request.dto';
import { GetPlanDFescriptionFromPlanNameException } from './get-plan-description-from-plan-name.exception';
import { IGetPlanDescriptionFromPlanNameResponse } from './get-plan-description-from-plan-name-response.interface';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';
import { BossHelper } from 'src/boss-helpers/boss.helper';

@Injectable()
export class GetPlanDescriptionFromPlanNameService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  // TODO: Revisar que el parámetro de entrada indica que es NUMBER, pero el y nombre y la descripción en el documento de especificacion indican que STRING
  async getPlanDescriptionFromPlanName(
    dto: GetPlanDescriptionFromPlanNameRequestDto,
  ): Promise<IGetPlanDescriptionFromPlanNameResponse> {
    try {
      Wlog.instance.info({
        message: 'Inicio',
        bindingData: BossHelper.getPhoneNumber(dto),
        clazz: GetPlanDescriptionFromPlanNameService.name,
        method: 'getPlanDescriptionFromPlanName',
      });
      await super.connect();
      const parameters = {
        sz_PlanName: OracleHelper.stringBindIn(dto.planName),
        sz_Description: OracleHelper.stringBindOut(),
        status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        BossConstants.ACT_PACKAGE,
        BossConstants.GET_PLAN_DESCRIPTION_FROM_PLAN_NAME,
        parameters,
      );
      const response: IGetPlanDescriptionFromPlanNameResponse = {
        name: dto.planName,
        description: result?.outBinds?.sz_Description,
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
      Wlog.instance.error({
        message: error?.message,
        bindingData: BossHelper.getPhoneNumber(dto),
        clazz: GetPlanDescriptionFromPlanNameService.name,
        method: 'getPlanDescriptionFromPlanName',
        error: error,
        stack: error?.stack,
      });
      super.exceptionHandler(error);
    } finally {
      await this.closeConnection();
    }
  }
}
