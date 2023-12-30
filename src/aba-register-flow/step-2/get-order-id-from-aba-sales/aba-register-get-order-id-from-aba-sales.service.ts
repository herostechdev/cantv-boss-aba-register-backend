import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { Error2002Exception } from 'src/exceptions/error-2002.exception';
import { GetOrderIdFromABASalesException } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales.exception';
import { GetOrderIdFromABASalesRawService } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-raw.service';
import { GetOrderIdFromABASalesRequestDto } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-request.dto';
import { GetOrderIdFromABASalesStatusConstants } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-status.constants';
import { IGetOrderIdFromABASalesResponse } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-response.interface';

@Injectable()
export class AbaRegisterGetOrderIdFromAbaSalesService extends AbaRegisterExecuteService<
  GetOrderIdFromABASalesRequestDto,
  IGetOrderIdFromABASalesResponse
> {
  constructor(protected readonly rawService: GetOrderIdFromABASalesRawService) {
    super(
      AbaRegisterGetOrderIdFromAbaSalesService.name,
      'Verifica si la IP es permisada',
      rawService,
    );
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
