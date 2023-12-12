import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { IUpdateDslAbaRegistersResponse } from './update-dsl-aba-registers-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersInternalErrorException } from './update-dsl-aba-registers-internal-error.exception';
import { UpdateDslAbaRegistersRequestDto } from './update-dsl-aba-registers-request.dto';
import { UpdateDslAbaRegistersStatusConstants } from './update-dsl-aba-registers-status.constants';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class UpdateDslAbaRegistersService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async update(
    dto: UpdateDslAbaRegistersRequestDto,
  ): Promise<IUpdateDslAbaRegistersResponse> {
    try {
      Wlog.instance.info({
        message: 'Inicio',
        data: BossHelper.getPhoneNumber(dto),
        clazz: UpdateDslAbaRegistersService.name,
        method: 'update',
      });
      const parameters = {
        iAreaCode: OracleHelper.stringBindIn(dto.areaCode, 3),
        iPhoneNumber: OracleHelper.stringBindIn(dto.phoneNumber, 7),
        iRegisterStatus: OracleHelper.stringBindIn(dto.registerStatus, 16),
        status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        BossConstants.ABA_PACKAGE,
        BossConstants.UPDATE_DSL_ABA_REGISTERS,
        parameters,
      );
      const response: IUpdateDslAbaRegistersResponse = {
        status: (result?.outBinds?.status ??
          UpdateDslAbaRegistersStatusConstants.INTERNAL_ERROR) as UpdateDslAbaRegistersStatusConstants,
      };
      Wlog.instance.info({
        message: 'Fin',
        data: BossHelper.getPhoneNumber(dto),
        clazz: UpdateDslAbaRegistersService.name,
        method: 'update',
      });
      switch (response.status) {
        case UpdateDslAbaRegistersStatusConstants.SUCCESSFULL:
          return response;
        case UpdateDslAbaRegistersStatusConstants.INTERNAL_ERROR:
          throw new UpdateDslAbaRegistersInternalErrorException();
        default:
          throw new UpdateDslAbaRegistersInternalErrorException();
      }
    } catch (error) {
      Wlog.instance.error({
        message: error?.message,
        data: BossHelper.getPhoneNumber(dto),
        clazz: UpdateDslAbaRegistersService.name,
        method: 'update',
        error: error,
        stack: error?.stack,
      });
      super.exceptionHandler(error, `${JSON.stringify(dto)}`);
    } finally {
      await this.closeConnection();
    }
  }
}
