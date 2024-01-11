import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { AbaRegisterConfirmRegistrationResponse } from './step-4/confirm-registration/aba-register-confirm-registration-response';
import { AbaRegisterConfirmRegistrationRequestDto } from './step-4/confirm-registration/aba-register-confirm-registration-request.dto';
import { AbaRegisterConfirmRegistrationService } from './step-4/confirm-registration/aba-register-confirm-registration.service';
import { AbaRegisterGetDslAreaCodesService } from './dependencies/get-dsl-area-codes/aba-register-get-dsl-area-codes.service';
import { AbaRegisterGetLegalDocumentsRequestDto } from './step-4/get-legal-documents/aba-register-get-legal-documents-request.dto';
import { AbaRegisterGetLegalDocumentsService } from './step-4/get-legal-documents/aba-register-get-legal-documents.service';
import { AbaRegisterGetOrderIdFromAbaSalesService } from './step-2/get-order-id-from-aba-sales/aba-register-get-order-id-from-aba-sales.service';
import { AbaRegisterGetStateFromSerialService } from './step-4/get-state-from-serial/aba-register-get-state-from-serial.service';
import { AbaRegisterIsIPAllowedService } from './step-1/is-ip-allowed/aba-register-is-ip-allowed.service';
import { AbaRegisterLoginRequestDto } from './step-1/login/aba-register-login-request.dto';
import { AbaRegisterLoginService } from './step-1/login/aba-register-login.service';
import { AbaRegisterPlansByCustomerClassService } from './step-3/plans-by-customer-class/plans-by-customer-class.service';
import { AbaRegisterRequestDto } from 'src/raw/stored-procedures/aba-register/aba-register-request.dto';
import { AbaRegisterService } from './dependencies/aba-register/aba-register.service';
import { AbaRegisterValidateCustomerData } from './step-2/validate-customer/aba-register-validate-customer-data';
import { AbaRegisterValidateCustomerRequestDto } from './step-2/validate-customer/aba-register-validate-customer-request.dto';
import { AbaRegisterValidateCustomerService } from './step-2/validate-customer/aba-register-validate-customer.service';
import { GetDSLAreaCodesRequestDto } from 'src/raw/stored-procedures/get-dsl-area-codes/get-dsl-area-codes-request.dto';
import { GetOrderIdFromABASalesRequestDto } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-request.dto';
import { GetStateFromSerialRequestDto } from 'src/raw/stored-procedures/insert-dsl-aba-registers/get-state-from-serial/get-state-from-serial-request.dto';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IAbaRegisterGetLegalDocuments } from './step-4/get-legal-documents/aba-register-get-legal-documents-response.interface';
import { IAbaRegisterResponse } from 'src/raw/stored-procedures/aba-register/aba-register-response.interface';
import { IGetDSLAreaCodesResponse } from 'src/raw/stored-procedures/get-dsl-area-codes/get-dsl-area-codes-response.interface';
import { IGetOrderIdFromABASalesResponse } from 'src/raw/stored-procedures/get-order-id-from-aba-sales/get-order-id-from-aba-sales-response.interface';
import { IGetStateFromSerialResponse } from 'src/raw/stored-procedures/insert-dsl-aba-registers/get-state-from-serial/get-state-from-serial-response.interface';
import { IPlansByCustomerClassListResponse } from 'src/raw/stored-procedures/plans-by-customer-class/plans-by-customer-class-list-response.interface';
import { IIsIPAllowedResponse } from 'src/raw/stored-procedures/is-ip-allowed/is-ip-allowed-response.interface';
import { IsIPAllowedRequestDto } from 'src/raw/stored-procedures/is-ip-allowed/is-ip-allowed-request.dto';
import { PlansByCustomerClassRequestDto } from 'src/raw/stored-procedures/plans-by-customer-class/plans-by-customer-class-request.dto';

@Controller({
  path: 'abaRegister',
  version: '1',
})
export class AbaRegisterController {
  constructor(
    private readonly abaRegisterConfirmRegistrationService: AbaRegisterConfirmRegistrationService,
    private readonly abaRegisterGetDslAreaCodesService: AbaRegisterGetDslAreaCodesService,
    private readonly abaRegisterGetLegalDocumentsService: AbaRegisterGetLegalDocumentsService,
    private readonly abaRegisterGetStateFromSerialService: AbaRegisterGetStateFromSerialService,
    private readonly abaRegisterGetOrderIdFromAbaSalesService: AbaRegisterGetOrderIdFromAbaSalesService,
    private readonly abaRegisterIsIPAllowedService: AbaRegisterIsIPAllowedService,
    private readonly abaRegisterLoginService: AbaRegisterLoginService,
    private readonly abaRegisterPlansByCustomerClassService: AbaRegisterPlansByCustomerClassService,
    private readonly abaRegisterService: AbaRegisterService,
    private readonly abaRegisterValidateCustomerService: AbaRegisterValidateCustomerService,
  ) {}

  @Post('abaRegister')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  abaRegister(
    @Body() dto: AbaRegisterRequestDto,
  ): Promise<IAbaRegisterResponse> {
    return this.abaRegisterService.execute(dto);
  }

  @Post('confirmRegistration')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  confirmRegistration(
    @Body() dto: AbaRegisterConfirmRegistrationRequestDto,
  ): Promise<AbaRegisterConfirmRegistrationResponse> {
    return this.abaRegisterConfirmRegistrationService.execute(dto);
  }

  @Post('getDslAreaCodes')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getDslAreaCodes(
    @Body() dto: GetDSLAreaCodesRequestDto,
  ): Promise<IGetDSLAreaCodesResponse> {
    return this.abaRegisterGetDslAreaCodesService.execute(dto);
  }

  @Post('getLegalDocuments')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getLegalDocuments(
    @Body() dto: AbaRegisterGetLegalDocumentsRequestDto,
  ): Promise<IAbaRegisterGetLegalDocuments> {
    return this.abaRegisterGetLegalDocumentsService.get(dto);
  }

  @Post('getStateFromSerial')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getStateFromSerial(
    @Body() dto: GetStateFromSerialRequestDto,
  ): Promise<IGetStateFromSerialResponse> {
    return this.abaRegisterGetStateFromSerialService.execute(dto);
  }

  @Post('getOrderIdFromAbaSales')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getOrderIdFromAbaSales(
    @Body() dto: GetOrderIdFromABASalesRequestDto,
  ): Promise<IGetOrderIdFromABASalesResponse> {
    return this.abaRegisterGetOrderIdFromAbaSalesService.execute(dto);
  }

  @Post('isIpAllowed')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isIPAllowed(
    @Body() dto: IsIPAllowedRequestDto,
  ): Promise<IIsIPAllowedResponse> {
    return this.abaRegisterIsIPAllowedService.execute(dto);
  }

  @Post('login')
  @HttpCode(HttpCodeConstants.HTTP_204_NO_CONTENT)
  @UseFilters(new HttpExceptionFilter())
  login(@Body() dto: AbaRegisterLoginRequestDto): Promise<void> {
    return this.abaRegisterLoginService.execute(dto);
  }

  @Post('plansByCustomerClass')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  plansByCustomerClass(
    @Body() dto: PlansByCustomerClassRequestDto,
  ): Promise<IPlansByCustomerClassListResponse> {
    return this.abaRegisterPlansByCustomerClassService.execute(dto);
  }

  @Post('validateCustomer')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  validateCustomer(
    @Body() dto: AbaRegisterValidateCustomerRequestDto,
  ): Promise<AbaRegisterValidateCustomerData> {
    return this.abaRegisterValidateCustomerService.validate(dto);
  }
}
