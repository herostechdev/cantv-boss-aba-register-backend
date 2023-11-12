import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { CRMGetCustomerDto } from './get-customer/crm-get-customer.dto';
import { CRMGetCustomersService } from './get-customer/crm-get-customers.service';
import { ICRMGetCustomerResponse } from './get-customer/crm-get-customer-response.interface';
import { CustomerByPhoneNumberService } from './customer-by-phone-number/customer-by-phone-number.service';
import { CustomerByPhoneNumberDto } from './customer-by-phone-number/customer-by-phone-number.dto';
import { ICustomerByPhoneNumberResponse } from './customer-by-phone-number/customer-by-phone-number-response.interface';

@Injectable()
export class CustomersService extends CommonService {
  constructor(
    private readonly crmGetCustomersService: CRMGetCustomersService,
    private readonly customerByPhoneNumberService: CustomerByPhoneNumberService,
  ) {
    super();
  }

  crmCustomer(dto: CRMGetCustomerDto): Promise<ICRMGetCustomerResponse> {
    return this.crmGetCustomersService.get(dto);
  }

  byPhoneNumber(
    dto: CustomerByPhoneNumberDto,
  ): Promise<ICustomerByPhoneNumberResponse> {
    return this.customerByPhoneNumberService.get(dto);
  }
}
