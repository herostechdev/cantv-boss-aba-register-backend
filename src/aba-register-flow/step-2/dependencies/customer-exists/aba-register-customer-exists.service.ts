import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CustomerExistsException } from 'src/raw/stored-procedures/customer-exists/customer-exists.exception';
import { CustomerExistsRawService } from 'src/raw/stored-procedures/customer-exists/customer-exists-raw.service';
import { CustomerExistsRequestDto } from 'src/raw/stored-procedures/customer-exists/customer-exists-request.dto';
import { CustomerExistsStatusConstants } from 'src/raw/stored-procedures/customer-exists/customer-exists-status.constants';
import { ICustomerExistsResponse } from 'src/raw/stored-procedures/customer-exists/customer-exists-response.interface';
import { OracleFinalExecuteService } from 'src/oracle/oracle-execute.interface';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterCustomerExistsService extends OracleFinalExecuteService<
  CustomerExistsRequestDto,
  ICustomerExistsResponse
> {
  constructor(
    private readonly customerExistsRawService: CustomerExistsRawService,
  ) {
    super();
  }

  async execute(
    dto: CustomerExistsRequestDto,
    dbConnection?: Connection,
  ): Promise<ICustomerExistsResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        input: JSON.stringify(dto),
        clazz: AbaRegisterCustomerExistsService.name,
        method: 'execute',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Obteniendo información de linea prepago',
        input: JSON.stringify(dto),
        clazz: AbaRegisterCustomerExistsService.name,
        method: 'execute',
      });
      const response = await this.customerExistsRawService.execute(
        dto,
        dbConnection,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: JSON.stringify(dto),
        clazz: AbaRegisterCustomerExistsService.name,
        method: 'execute',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterCustomerExistsService.name,
        method: 'execute',
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
  }

  protected processResponse(
    response: ICustomerExistsResponse,
  ): ICustomerExistsResponse {
    switch (response.status) {
      case CustomerExistsStatusConstants.SUCCESSFULL:
        return response;
      case CustomerExistsStatusConstants.ERROR:
        throw new CustomerExistsException();
      case CustomerExistsStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new CustomerExistsException();
    }
  }
}
