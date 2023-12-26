import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { CRMCustomerDto } from './crm-customer/crm-customer.dto';
import { CRMCustomersService } from './crm-customer/crm-customers.service';
import { CustomerByPhoneNumberDto } from './customer-by-phone-number/customer-by-phone-number.dto';
import { CustomerByPhoneNumberService } from './customer-by-phone-number/customer-by-phone-number.service';
import { GetASAPOrderDetailService } from './get-asap-order-detail/get-asap-order-detail.service';
import { GetASAPOrderDetailRequestDto } from './get-asap-order-detail/get-asap-order-detail-request.dto';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { ICRMCustomerResponse } from './crm-customer/crm-customer-response.interface';
import { ICustomerByPhoneNumberResponse } from './customer-by-phone-number/customer-by-phone-number-response.interface';
import { IGetASAPOrderDetailResponse } from './get-asap-order-detail/get-asap-order-detail-response.interface';

@Controller('v1/raw/pic')
export class PICController {
  constructor(
    private readonly crmCustomersService: CRMCustomersService,
    private readonly customerByPhoneNumberService: CustomerByPhoneNumberService,
    private readonly getASAPOrderDetailService: GetASAPOrderDetailService,
  ) {}

  @Post('customers/fromCRM')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  crmCustomer(@Body() dto: CRMCustomerDto): Promise<ICRMCustomerResponse> {
    return this.crmCustomersService.execute(dto);
  }

  @Post('customers/byPhoneNumber')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  byPhoneNumber(
    @Body() dto: CustomerByPhoneNumberDto,
  ): Promise<ICustomerByPhoneNumberResponse> {
    return this.customerByPhoneNumberService.execute(dto);
  }

  @Post('asapOrderDetail')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  asapOrderDetail(
    @Body() dto: GetASAPOrderDetailRequestDto,
  ): Promise<IGetASAPOrderDetailResponse> {
    return this.getASAPOrderDetailService.execute(dto);
  }
}
