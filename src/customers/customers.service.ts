import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { CRMCustomerDto } from './crm-customer/crm-customer.dto';
import { CRMCustomersService } from './crm-customer/crm-customers.service';
import { ICRMCustomerResponse } from './crm-customer/crm-customer-response.interface';
import { CustomerByPhoneNumberService } from './customer-by-phone-number/customer-by-phone-number.service';
import { CustomerByPhoneNumberDto } from './customer-by-phone-number/customer-by-phone-number.dto';
import { ICustomerByPhoneNumberResponse } from './customer-by-phone-number/customer-by-phone-number-response.interface';

@Injectable()
export class CustomersService extends CommonService {
  constructor(
    private readonly crmGetCustomersService: CRMCustomersService,
    private readonly customerByPhoneNumberService: CustomerByPhoneNumberService,
  ) {
    super();
  }

  crmCustomer(dto: CRMCustomerDto): Promise<ICRMCustomerResponse> {
    return this.crmGetCustomersService.get(dto);
  }

  byPhoneNumber(
    dto: CustomerByPhoneNumberDto,
  ): Promise<ICustomerByPhoneNumberResponse> {
    return this.customerByPhoneNumberService.get(dto);
  }
}
