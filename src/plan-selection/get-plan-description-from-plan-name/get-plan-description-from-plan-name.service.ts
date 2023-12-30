import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { GetPlanDescriptionFromPlanNameStatusConstants } from './get-plan-description-from-plan-name-status.constants';
import { GetPlanDescriptionFromPlanNameRequestDto } from './get-plan-description-from-plan-name-request.dto';
import { GetPlanDFescriptionFromPlanNameException } from './get-plan-description-from-plan-name.exception';
import { IGetPlanDescriptionFromPlanNameResponse } from './get-plan-description-from-plan-name-response.interface';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class GetPlanDescriptionFromPlanNameService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  async getPlanDescriptionFromPlanName(
    dto: GetPlanDescriptionFromPlanNameRequestDto,
  ): Promise<IGetPlanDescriptionFromPlanNameResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.START,
        input: BossHelper.getPhoneNumber(dto),
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
          break;
        case GetPlanDescriptionFromPlanNameStatusConstants.INTERNAL_ERROR:
          throw new GetPlanDFescriptionFromPlanNameException();
        case GetPlanDescriptionFromPlanNameStatusConstants.THERE_IS_NO_DATA:
          break;
        default:
          throw new GetPlanDFescriptionFromPlanNameException();
      }
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.END,
        input: BossHelper.getPhoneNumber(dto),
        clazz: GetPlanDescriptionFromPlanNameService.name,
        method: 'getPlanDescriptionFromPlanName',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: BossHelper.getPhoneNumber(dto),
        clazz: GetPlanDescriptionFromPlanNameService.name,
        method: 'getPlanDescriptionFromPlanName',
        error: error,
      });
      await this.updateDslAbaRegistersService.errorUpdate({
        areaCode: String(dto.areaCode),
        phoneNumber: String(dto.phoneNumber),
        registerStatus: BossConstants.NOT_PROCESSED,
      });
      super.exceptionHandler(error);
    } finally {
      await this.closeConnection();
    }
  }
}
