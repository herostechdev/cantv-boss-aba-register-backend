import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { GetAndRegisterQualifOfServiceDto } from 'src/raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service-request.dto';
import { GetAndRegisterQualifOfServiceException } from 'src/raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service.exception';
import { GetAndRegisterQualifOfServiceRawService } from 'src/raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service-raw.service';
import { GetAndRegisterQualifOfServiceStatusConstants } from 'src/raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service-status.constants';
import { IGetAndRegisterQualifOfServiceResponse } from 'src/raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service-response.interface';
import { OracleFinalExecuteService } from 'src/oracle/oracle-execute.interface';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterGetAndRegisterQualifOfServiceService extends OracleFinalExecuteService<
  GetAndRegisterQualifOfServiceDto,
  IGetAndRegisterQualifOfServiceResponse
> {
  constructor(
    private readonly getAndRegisterQualifOfServiceRawService: GetAndRegisterQualifOfServiceRawService,
  ) {
    super();
  }

  async execute(
    dto: GetAndRegisterQualifOfServiceDto,
    dbConnection?: Connection,
  ): Promise<IGetAndRegisterQualifOfServiceResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetAndRegisterQualifOfServiceService.name,
        method: 'execute',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Ejecutando el servicio GetAndRegisterQualifOfServiceService',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetAndRegisterQualifOfServiceService.name,
        method: 'execute',
      });
      const response =
        await this.getAndRegisterQualifOfServiceRawService.execute(
          dto,
          dbConnection,
        );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetAndRegisterQualifOfServiceService.name,
        method: 'execute',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetAndRegisterQualifOfServiceService.name,
        method: 'execute',
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
  }

  protected processResponse(
    response: IGetAndRegisterQualifOfServiceResponse,
  ): IGetAndRegisterQualifOfServiceResponse {
    switch (response.status) {
      case GetAndRegisterQualifOfServiceStatusConstants.SUCCESSFULL:
        return response;
      case GetAndRegisterQualifOfServiceStatusConstants.ERROR:
        throw new GetAndRegisterQualifOfServiceException();
      default:
        throw new GetAndRegisterQualifOfServiceException();
    }
  }
}
