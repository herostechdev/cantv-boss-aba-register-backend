import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { Error2002Exception } from 'src/exceptions/error-2002.exception';
import { GetOrderIdFromABASalesException } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales.exception';
import { GetOrderIdFromABASalesRawService } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-raw.service';
import { GetOrderIdFromABASalesRequestDto } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-request.dto';
import { GetOrderIdFromABASalesStatusConstants } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-status.constants';
import { IGetOrderIdFromABASalesResponse } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-response.interface';
import { OracleFinalExecuteService } from 'src/oracle/oracle-execute.interface';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterGetOrderIdFromAbaSalesService extends OracleFinalExecuteService<
  GetOrderIdFromABASalesRequestDto,
  IGetOrderIdFromABASalesResponse
> {
  constructor(
    private readonly getOrderIdFromABASalesRawService: GetOrderIdFromABASalesRawService,
  ) {
    super();
  }

  async execute(
    dto: GetOrderIdFromABASalesRequestDto,
    dbConnection?: Connection,
  ): Promise<IGetOrderIdFromABASalesResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetOrderIdFromAbaSalesService.name,
        method: 'execute',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Verifica si la IP es permisada',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetOrderIdFromAbaSalesService.name,
        method: 'execute',
      });
      const response = await this.getOrderIdFromABASalesRawService.execute(
        dto,
        dbConnection,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetOrderIdFromAbaSalesService.name,
        method: 'execute',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetOrderIdFromAbaSalesService.name,
        method: 'execute',
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
  }

  protected processResponse(
    response: IGetOrderIdFromABASalesResponse,
  ): IGetOrderIdFromABASalesResponse {
    switch (response.status) {
      case GetOrderIdFromABASalesStatusConstants.SUCCESSFULL:
        return response;
      case GetOrderIdFromABASalesStatusConstants.ERROR:
        throw new GetOrderIdFromABASalesException();
      case GetOrderIdFromABASalesStatusConstants.PHONE_WITHOUT_PRE_ORDER:
        return response;
      case GetOrderIdFromABASalesStatusConstants.PRE_ORDER_NOT_ACCEPTED_OR_COMPLETED:
        throw new Error2002Exception();
      default:
        throw new GetOrderIdFromABASalesException();
    }
  }
}
