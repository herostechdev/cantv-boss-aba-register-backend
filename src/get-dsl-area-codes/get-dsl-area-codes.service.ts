import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { GetDSLAreaCodesException } from './get-dsl-area-codes.exception';
import { GetDSLAreaCodesStatusConstants } from './get-dsl-area-codes-status.constants';
import { IGetDSLAreaCodesResponse } from './get-dsl-area-codes-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class GetDSLAreaCodesService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async getDSLAreaCodesFlow(): Promise<IGetDSLAreaCodesResponse> {
    try {
      Wlog.instance.info({
        message: 'Inicio',
        data: null,
        clazz: GetDSLAreaCodesService.name,
        method: 'getDSLAreaCodes',
      });
      await super.connect();
      Wlog.instance.info({
        message: 'Obtiene los códigos de área',
        data: null,
        clazz: GetDSLAreaCodesService.name,
        method: 'getDSLAreaCodes',
      });
      const response = await this.getDSLAreaCodes();
      Wlog.instance.info({
        message: 'Fin',
        data: null,
        clazz: GetDSLAreaCodesService.name,
        method: 'getDSLAreaCodes',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        message: error.message,
        data: null,
        clazz: GetDSLAreaCodesService.name,
        method: 'getDSLAreaCodes',
      });
      super.exceptionHandler(error);
    } finally {
      await super.closeConnection();
    }
  }

  private async getDSLAreaCodes(): Promise<IGetDSLAreaCodesResponse> {
    const parameters = {
      areacodes: OracleHelper.tableOfStringBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_DSL_AREA_CODES,
      parameters,
    );
    const response: IGetDSLAreaCodesResponse = {
      areaCodes: OracleHelper.getItems(result, 'areacodes'),
      status: (result?.outBinds?.o_status ??
        GetDSLAreaCodesStatusConstants.INTERNAL_ERROR) as GetDSLAreaCodesStatusConstants,
    };
    switch (response.status) {
      case GetDSLAreaCodesStatusConstants.SUCCESSFULL:
        return response;
      case GetDSLAreaCodesStatusConstants.INTERNAL_ERROR:
        throw new GetDSLAreaCodesException(result);
      case GetDSLAreaCodesStatusConstants.THERE_IS_NO_DATA:
        throw new GetDSLAreaCodesException();
      default:
        throw new GetDSLAreaCodesException(result);
    }
  }
}
