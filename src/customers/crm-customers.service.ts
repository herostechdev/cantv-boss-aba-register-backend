import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { CRMGetCustomerDto } from './get-customer/crm-get-customer.dto';
import { CRMGetCustomersService } from './get-customer/crm-get-customers.service';
import { ICRMGetCustomerResponse } from './get-customer/crm-get-customer-response.interface';

@Injectable()
export class CRMCustomersService extends CommonService {
  constructor(private readonly customersService: CRMGetCustomersService) {
    super();
  }

  getCustomer(dto: CRMGetCustomerDto): Promise<ICRMGetCustomerResponse> {
    return this.customersService.getCustomer(dto);
  }
}
