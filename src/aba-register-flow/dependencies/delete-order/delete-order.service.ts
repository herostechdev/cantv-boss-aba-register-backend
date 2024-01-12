import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { DeleteOrderExecutionErrorException } from 'src/raw/stored-procedures/delete-order/delete-order-execution-error.exception';
import { DeleteOrderRawService } from 'src/raw/stored-procedures/delete-order/delete-order-raw.service';
import { DeleteOrderRequestDto } from 'src/raw/stored-procedures/delete-order/delete-order-request.dto';
import { DeleteOrderStatusConstants } from 'src/raw/stored-procedures/delete-order/delete-order-status.constants';
import { DeleteOrderThePortIsOccupiedByAnotherContractException } from 'src/raw/stored-procedures/delete-order/delete-order-the-is-occupied-by-another-contract.exception';
import { IDeleteOrderResponse } from 'src/raw/stored-procedures/delete-order/delete-order-response.interface';

@Injectable()
export class AbaRegisterDeleteOrderService extends AbaRegisterExecuteService<
  DeleteOrderRequestDto,
  IDeleteOrderResponse
> {
  constructor(protected readonly rawService: DeleteOrderRawService) {
    super(
      AbaRegisterDeleteOrderService.name,
      'Eliminando la orden de servicio',
      rawService,
    );
  }

  protected processResponse(
    response: IDeleteOrderResponse,
  ): IDeleteOrderResponse {
    switch (response.status) {
      case DeleteOrderStatusConstants.SUCCESSFULL:
        return response;
      case DeleteOrderStatusConstants.ERROR:
        throw new DeleteOrderExecutionErrorException();
      case DeleteOrderStatusConstants.THERE_IS_NO_DATA:
        return response;
      case DeleteOrderStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT:
        throw new DeleteOrderThePortIsOccupiedByAnotherContractException();
      default:
        throw new DeleteOrderExecutionErrorException();
    }
  }
}
