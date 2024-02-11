import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { CreateAndProvisioningCustomerRawService } from 'src/raw/database/stored-procedures/create-and-provisioning-customer/create-and-provisioning-customer-raw.service';
import { CreateAndProvisioningCustomerRequestDto } from 'src/raw/database/stored-procedures/create-and-provisioning-customer/create-and-provisioning-customer-request.dto';
import { CreateAndProvisioningCustomerStatusConstants } from 'src/raw/database/stored-procedures/create-and-provisioning-customer/create-and-provisioning-customer-status.constants';
import { CreateAndProvisioningCustomerException } from 'src/raw/database/stored-procedures/create-and-provisioning-customer/create-and-provisioning-customer.exception';
import { ICreateAndProvisioningCustomerResponse } from 'src/raw/database/stored-procedures/create-and-provisioning-customer/create-and-provisioning-customer-response.interface';

@Injectable()
export class AbaRegisterCreateAndProvisioningCustomerService extends AbaRegisterExecuteService<
  CreateAndProvisioningCustomerRequestDto,
  ICreateAndProvisioningCustomerResponse
> {
  constructor(
    protected readonly rawService: CreateAndProvisioningCustomerRawService,
  ) {
    super(
      AbaRegisterCreateAndProvisioningCustomerService.name,
      'Creando y aprovisionando el cliente',
      rawService,
    );
  }

  protected processResponse(
    response: ICreateAndProvisioningCustomerResponse,
  ): ICreateAndProvisioningCustomerResponse {
    switch (response.status) {
      case CreateAndProvisioningCustomerStatusConstants.SUCCESSFULL:
        return response;
      case CreateAndProvisioningCustomerStatusConstants.ERROR:
        throw new CreateAndProvisioningCustomerException();
      default:
        throw new CreateAndProvisioningCustomerException();
    }
  }
}
