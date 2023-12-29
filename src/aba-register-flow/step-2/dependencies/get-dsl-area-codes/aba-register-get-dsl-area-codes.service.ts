import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { GetDSLAreaCodesException } from 'src/raw/stored-procedures/get-dsl-area-codes/get-dsl-area-codes.exception';
import { GetDSLAreaCodesRawService } from 'src/raw/stored-procedures/get-dsl-area-codes/get-dsl-area-codes-raw.service';
import { GetDSLAreaCodesRequestDto } from 'src/raw/stored-procedures/get-dsl-area-codes/get-dsl-area-codes-request.dto';
import { GetDSLAreaCodesStatusConstants } from 'src/raw/stored-procedures/get-dsl-area-codes/get-dsl-area-codes-status.constants';
import { IGetDSLAreaCodesResponse } from 'src/raw/stored-procedures/get-dsl-area-codes/get-dsl-area-codes-response.interface';
import { OracleFinalExecuteService } from 'src/oracle/oracle-final-execute.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterGetDslAreaCodesService extends OracleFinalExecuteService<
  GetDSLAreaCodesRequestDto,
  IGetDSLAreaCodesResponse
> {
  constructor(
    private readonly getDSLAreaCodesRawService: GetDSLAreaCodesRawService,
  ) {
    super();
  }

  async execute(
    dto: GetDSLAreaCodesRequestDto,
    dbConnection?: Connection,
  ): Promise<IGetDSLAreaCodesResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetDslAreaCodesService.name,
        method: 'execute',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Obtiene los códigos de área',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetDslAreaCodesService.name,
        method: 'execute',
      });
      const response = await this.getDSLAreaCodesRawService.execute(
        dto,
        dbConnection,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetDslAreaCodesService.name,
        method: 'execute',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetDslAreaCodesService.name,
        method: 'execute',
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
  }

  protected processResponse(
    response: IGetDSLAreaCodesResponse,
  ): IGetDSLAreaCodesResponse {
    switch (response.status) {
      case GetDSLAreaCodesStatusConstants.SUCCESSFULL:
        return response;
      case GetDSLAreaCodesStatusConstants.ERROR:
        throw new GetDSLAreaCodesException();
      case GetDSLAreaCodesStatusConstants.THERE_IS_NO_DATA:
        throw new GetDSLAreaCodesException();
      default:
        throw new GetDSLAreaCodesException();
    }
  }
}
