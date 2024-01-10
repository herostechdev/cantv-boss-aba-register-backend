import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { AbaRegisterRawService } from './aba-register/aba-register-raw.service';
import { AbaRegisterRequestDto } from './aba-register/aba-register-request.dto';
import { CancelAbaInstallationRawService } from './cancel-aba-installation/cancel-aba-installation-raw.service';
import { CancelAbaInstallationRequestDto } from './cancel-aba-installation/cancel-aba-installation-request.dto';
import { CustomerExistsRequestDto } from './customer-exists/customer-exists-request.dto';
import { CustomerExistsRawService } from './customer-exists/customer-exists-raw.service';
import { DSLAuditLogsRequestDto } from './dsl-audit-logs/dsl-audit-logs-request.dto';
import { DSLAuditLogsRawService } from './dsl-audit-logs/dsl-audit-logs-raw.service';
import { GetAllValuesFromCustomerValuesRawService } from './get-all-values-from-customer-values/get-all-values-from-customer-values-raw.service';
import { GetAllValuesFromCustomerValuesRequestDto } from './get-all-values-from-customer-values/get-all-values-from-customer-values-request.dto';
import { GetAndRegisterQualifOfServiceDto } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-request.dto';
import { GetAndRegisterQualifOfServiceRawService } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-raw.service';
import { GetCustomerClassNameFromIdValueDto } from './get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-request.dto';
import { GetCustomerClassNameFromIdValueRawService } from './get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-raw.service';
import { GetCustomerInstanceIdFromIdValueRawService } from './get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-raw.service';
import { GetCustomerInstanceIdFromIdValueRequestDto } from './get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-request.dto';
import { GetDebtFromCustomerRawService } from './get-debt-from-customer/get-debt-from-customer-raw.service';
import { GetDebtFromCustomerRequestDto } from './get-debt-from-customer/get-debt-from-customer-request.dto';
import { GetDSLAreaCodesRequestDto } from './get-dsl-area-codes/get-dsl-area-codes-request.dto';
import { GetDSLAreaCodesRawService } from './get-dsl-area-codes/get-dsl-area-codes-raw.service';
import { GetFirstLetterFromABARequestDto } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-request.dto';
import { GetFirstLetterFromABARequestRawService } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-raw.service';
import { GetGroupAccessFromLoginRawService } from './get-group-access-from-login/get-group-access-from-login-raw.service';
import { GetGroupAccessFromLoginRequestDto } from './get-group-access-from-login/get-group-access-from-login-request.dto';
import { GetOrderIdFromABASalesRequestDto } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales-request.dto';
import { GetOrderIdFromABASalesRawService } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales-raw.service';
import { GetStateFromSerialRequestDto } from './insert-dsl-aba-registers/get-state-from-serial/get-state-from-serial-request.dto';
import { GetStateFromSerialRawService } from './insert-dsl-aba-registers/get-state-from-serial/get-state-from-serial-raw.service';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IAbaRegisterResponse } from './aba-register/aba-register-response.interface';
import { ICancelABAInstallationResponse } from './cancel-aba-installation/cancel-aba-installation-response.interface';
import { ICustomerExistsResponse } from './customer-exists/customer-exists-response.interface';
import { IDSLAuditLogsResponse } from './dsl-audit-logs/dsl-audit-logs-response.interface';
import { IGetAllValuesFromCustomerValuesResponse } from './get-all-values-from-customer-values/get-all-values-from-customer-values-response.interface';
import { IGetAndRegisterQualifOfServiceResponse } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-response.interface';
import { IGetCustomerClassNameFromIdValueResponse } from './get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-response.interface';
import { IGetCustomerInstanceIdFromIdValueResponse } from './get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-response.interface';
import { IGetDebtFromCustomerResponse } from './get-debt-from-customer/get-debt-from-customer-response.interface';
import { IGetDSLAreaCodesResponse } from './get-dsl-area-codes/get-dsl-area-codes-response.interface';
import { IGetFirstLetterFromABARequestResponse } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-response.interface';
import { IGetGroupAccessFromLoginResponse } from './get-group-access-from-login/get-group-access-from-login-response.interface';
import { IGetOrderIdFromABASalesResponse } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales-response.interface';
import { IGetStateFromSerialResponse } from './insert-dsl-aba-registers/get-state-from-serial/get-state-from-serial-response.interface';
import { IInsertDslAbaRegistersResponse } from './insert-dsl-aba-registers/insert-dsl-aba-registers-response.interface';
import { IIsIPAllowedResponse } from './is-ip-allowed/is-ip-allowed-response.interface';
import { IISGActionAllowedResponse } from './isg-action-allowed/isg-action-allowed-response.interface';
import { IIsPrepaidVoiceLineResponse } from './is-prepaid-voice-line/is-prepaid-voice-line-response.interface';
import { InsertDslAbaRegistersRawService } from './insert-dsl-aba-registers/insert-dsl-aba-registers-raw.service';
import { InsertDslAbaRegistersRequestDto } from './insert-dsl-aba-registers/insert-dsl-aba-registers-request.dto';
import { IPlansByCustomerClassListResponse } from './plans-by-customer-class/plans-by-customer-class-list-response.interface';
import { ISGActionAllowedRawService } from './isg-action-allowed/isg-action-allowed-raw.service';
import { ISGActionAllowedRequestDto } from './isg-action-allowed/isg-action-allowed-request.dto';
import { IsIPAllowedRequestDto } from './is-ip-allowed/is-ip-allowed-request.dto';
import { IsIPAllowedRawService } from './is-ip-allowed/is-ip-allowed-raw.service';
import { IsPrepaidVoiceLineRawService } from './is-prepaid-voice-line/is-prepaid-voice-line-raw.service';
import { IsPrepaidVoiceLineRequestDto } from './is-prepaid-voice-line/is-prepaid-voice-line-request.dto';
import { IUpdateDslAbaRegistersResponse } from './update-dsl-aba-registers/update-dsl-aba-registers-response.interface';
import { PlansByCustomerClassRequestDto } from './plans-by-customer-class/plans-by-customer-class-request.dto';
import { PlansByCustomerClassRawService } from './plans-by-customer-class/plans-by-customer-class-raw.service';
import { UpdateDslAbaRegistersRawService } from './update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { UpdateDslAbaRegistersRequestDto } from './update-dsl-aba-registers/update-dsl-aba-registers-request.dto';

@Controller({
  path: 'raw/sp',
  version: '1',
})
export class StoredProceduresRawController {
  constructor(
    private readonly abaRegisterRawService: AbaRegisterRawService,
    private readonly cancelAbaInstallationRawService: CancelAbaInstallationRawService,
    private readonly customerExistsRawService: CustomerExistsRawService,
    private readonly dslAuditLogsService: DSLAuditLogsRawService,
    private readonly getAllValuesFromCustomerValuesRawService: GetAllValuesFromCustomerValuesRawService,
    private readonly getAndRegisterQualifOfServiceRawService: GetAndRegisterQualifOfServiceRawService,
    private readonly getCustomerClassNameFromIdValueRawService: GetCustomerClassNameFromIdValueRawService,
    private readonly getCustomerInstanceIdFromIdValueRawService: GetCustomerInstanceIdFromIdValueRawService,
    private readonly getDebtFromCustomerRawService: GetDebtFromCustomerRawService,
    private readonly getDSLAreaCodesRawService: GetDSLAreaCodesRawService,
    private readonly getFirstLetterFromABARequestRawService: GetFirstLetterFromABARequestRawService,
    private readonly getGroupAccessFromLoginRawService: GetGroupAccessFromLoginRawService,
    private readonly getOrderIdFromABASalesRawService: GetOrderIdFromABASalesRawService,
    private readonly getStateFromSerialService: GetStateFromSerialRawService,
    private readonly insertDslAbaRegistersRawService: InsertDslAbaRegistersRawService,
    private readonly isIPAllowedRawService: IsIPAllowedRawService,
    private readonly isPrepaidVoiceLineRawService: IsPrepaidVoiceLineRawService,
    private readonly isgActionAllowedRawService: ISGActionAllowedRawService,
    private readonly planByCiustomerClassRawService: PlansByCustomerClassRawService,
    private readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
  ) {}
  @Post('abaRegister')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  abaRegister(
    @Body() dto: AbaRegisterRequestDto,
  ): Promise<IAbaRegisterResponse> {
    return this.abaRegisterRawService.execute(dto);
  }

  @Post('cancelAbaInstallation')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  cancelAbaInstallation(
    @Body() dto: CancelAbaInstallationRequestDto,
  ): Promise<ICancelABAInstallationResponse> {
    return this.cancelAbaInstallationRawService.execute(dto);
  }

  @Post('customerExists')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  customerExists(
    @Body() dto: CustomerExistsRequestDto,
  ): Promise<ICustomerExistsResponse> {
    return this.customerExistsRawService.execute(dto);
  }

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  DSLAuditLogs(
    @Body() dto: DSLAuditLogsRequestDto,
  ): Promise<IDSLAuditLogsResponse> {
    return this.dslAuditLogsService.execute(dto);
  }

  @Post('getAllValuesFromCustomerValues')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getAllValuesFromCustomerValues(
    @Body() dto: GetAllValuesFromCustomerValuesRequestDto,
  ): Promise<IGetAllValuesFromCustomerValuesResponse> {
    return this.getAllValuesFromCustomerValuesRawService.execute(dto);
  }

  @Post('getAndRegisterQualifOfService')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getCustomerClassNameFromIdValue(
    @Body() dto: GetAndRegisterQualifOfServiceDto,
  ): Promise<IGetAndRegisterQualifOfServiceResponse> {
    return this.getAndRegisterQualifOfServiceRawService.execute(dto);
  }

  @Post('getCustomerClassNameFromIdValue')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getAndRegisterQualifOfService(
    @Body() dto: GetCustomerClassNameFromIdValueDto,
  ): Promise<IGetCustomerClassNameFromIdValueResponse> {
    return this.getCustomerClassNameFromIdValueRawService.execute(dto);
  }

  @Post('getCustomerInstanceIdFromIdValue')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getCustomerInstanceIdFromIdValue(
    @Body() dto: GetCustomerInstanceIdFromIdValueRequestDto,
  ): Promise<IGetCustomerInstanceIdFromIdValueResponse> {
    return this.getCustomerInstanceIdFromIdValueRawService.execute(dto);
  }

  @Post('getDSLAreaCodes')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getDSLAreaCodes(
    @Body() dto: GetDSLAreaCodesRequestDto,
  ): Promise<IGetDSLAreaCodesResponse> {
    return this.getDSLAreaCodesRawService.execute(dto);
  }

  @Post('getDebtFromCustomer')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getDebtFromCustomer(
    @Body() dto: GetDebtFromCustomerRequestDto,
  ): Promise<IGetDebtFromCustomerResponse> {
    return this.getDebtFromCustomerRawService.execute(dto);
  }

  @Post('getFirstLetterFromABARequest')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getFirstLetterFromABARequest(
    @Body() dto: GetFirstLetterFromABARequestDto,
  ): Promise<IGetFirstLetterFromABARequestResponse> {
    return this.getFirstLetterFromABARequestRawService.execute(dto);
  }

  @Post('getGroupAccessFromLogin')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getGroupAccessFromLogin(
    @Body() dto: GetGroupAccessFromLoginRequestDto,
  ): Promise<IGetGroupAccessFromLoginResponse> {
    return this.getGroupAccessFromLoginRawService.execute(dto);
  }

  @Post('getOrderIdFromABASales')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  GetOrderIdFromABASales(
    @Body() dto: GetOrderIdFromABASalesRequestDto,
  ): Promise<IGetOrderIdFromABASalesResponse> {
    return this.getOrderIdFromABASalesRawService.execute(dto);
  }

  @Post('getStateFromSerial')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getStateFromSerial(
    @Body() dto: GetStateFromSerialRequestDto,
  ): Promise<IGetStateFromSerialResponse> {
    return this.getStateFromSerialService.execute(dto);
  }

  @Post('insertDslAbaRegisters')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  insertDslAbaRegisters(
    @Body() dto: InsertDslAbaRegistersRequestDto,
  ): Promise<IInsertDslAbaRegistersResponse> {
    return this.insertDslAbaRegistersRawService.execute(dto);
  }

  @Post('isIpAllowed')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isIPAllowed(
    @Body() dto: IsIPAllowedRequestDto,
  ): Promise<IIsIPAllowedResponse> {
    return this.isIPAllowedRawService.execute(dto);
  }

  @Post('isgActionAllowed')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isgActionAllowed(
    @Body() dto: ISGActionAllowedRequestDto,
  ): Promise<IISGActionAllowedResponse> {
    return this.isgActionAllowedRawService.execute(dto);
  }

  @Post('isPrepaidVoiceLine')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isPrepaidVoiceLine(
    @Body() dto: IsPrepaidVoiceLineRequestDto,
  ): Promise<IIsPrepaidVoiceLineResponse> {
    return this.isPrepaidVoiceLineRawService.execute(dto);
  }

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  ConfirmRegistration(
    @Body() dto: PlansByCustomerClassRequestDto,
  ): Promise<IPlansByCustomerClassListResponse> {
    return this.planByCiustomerClassRawService.execute(dto);
  }

  @Post('updateDslAbaRegisters')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  updateDslAbaRegisters(
    @Body() dto: UpdateDslAbaRegistersRequestDto,
  ): Promise<IUpdateDslAbaRegistersResponse> {
    return this.updateDslAbaRegistersRawService.execute(dto);
  }
}
