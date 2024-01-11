import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { CustomerExistsException } from 'src/raw/stored-procedures/customer-exists/customer-exists.exception';
import { CustomerExistsRawService } from 'src/raw/stored-procedures/customer-exists/customer-exists-raw.service';
import { CustomerExistsRequestDto } from 'src/raw/stored-procedures/customer-exists/customer-exists-request.dto';
import { CustomerExistsStatusConstants } from 'src/raw/stored-procedures/customer-exists/customer-exists-status.constants';
import { ICustomerExistsResponse } from 'src/raw/stored-procedures/customer-exists/customer-exists-response.interface';

@Injectable()
export class AbaRegisterCustomerExistsService extends AbaRegisterExecuteService<
  CustomerExistsRequestDto,
  ICustomerExistsResponse
> {
  constructor(protected readonly rawService: CustomerExistsRawService) {
    super(
      AbaRegisterCustomerExistsService.name,
      'Determinando si el cliente existe',
      rawService,
    );
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
