import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { IReadIABAOrderResponse } from 'src/raw/database/stored-procedures/read-iaba-order/read-iaba-order-response.interface';
import { ReadIABAOrderAssignedPortException } from 'src/raw/database/stored-procedures/read-iaba-order/read-iaba-order-assigned-port.exception';
import { ReadIABAOrderGeneralDatabaseErrorException } from 'src/raw/database/stored-procedures/read-iaba-order/read-iaba-order-general-database-error.exception';
import { ReadIABAOrderOrderExistsException } from 'src/raw/database/stored-procedures/read-iaba-order/read-iaba-order-order-exists.exception';
import { ReadIABAOrderOrderIsOldException } from 'src/raw/database/stored-procedures/read-iaba-order/read-iaba-order-order-is-old.exception';
import { ReadIABAOrderRawService } from 'src/raw/database/stored-procedures/read-iaba-order/read-iaba-order-raw.service';
import { ReadIABAOrderRequestDto } from 'src/raw/database/stored-procedures/read-iaba-order/read-iaba-order-request.dto';
import { ReadIABAOrderStatusConstants } from 'src/raw/database/stored-procedures/read-iaba-order/read-iaba-order-status.constants';
import { ReadIABAOrderTheOrderAlreadyExistsInBossException } from 'src/raw/database/stored-procedures/read-iaba-order/read-iaba-order-the-order-already-exists-in-boss.exception';

@Injectable()
export class AbaRegisterReadIABAOrderService extends AbaRegisterExecuteService<
  ReadIABAOrderRequestDto,
  IReadIABAOrderResponse
> {
  constructor(protected readonly rawService: ReadIABAOrderRawService) {
    super(
      AbaRegisterReadIABAOrderService.name,
      'Obtener información de la orden (IABA)',
      rawService,
    );
  }

  protected processResponse(
    response: IReadIABAOrderResponse,
  ): IReadIABAOrderResponse {
    switch (response.status) {
      case ReadIABAOrderStatusConstants.SUCCESSFULL:
        return response;
      case ReadIABAOrderStatusConstants.ASSIGNED_PORT:
        throw new ReadIABAOrderAssignedPortException();
      case ReadIABAOrderStatusConstants.THE_ORDER_EXISTS:
        throw new ReadIABAOrderOrderExistsException();
      case ReadIABAOrderStatusConstants.THE_ORDER_ID_OLD:
        throw new ReadIABAOrderOrderIsOldException();
      case ReadIABAOrderStatusConstants.THE_ORDER_ALREADY_EXISTS_IN_BOSS:
        throw new ReadIABAOrderTheOrderAlreadyExistsInBossException();
      case ReadIABAOrderStatusConstants.GENERAL_DATABASE_ERROR:
        throw new ReadIABAOrderGeneralDatabaseErrorException();
      default:
        throw new ReadIABAOrderGeneralDatabaseErrorException();
    }
  }
}
