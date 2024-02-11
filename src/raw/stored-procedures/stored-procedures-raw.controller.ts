import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { AbaRegisterRawService } from './aba-register/aba-register-raw.service';
import { AbaRegisterRequestDto } from './aba-register/aba-register-request.dto';
import { PayAbaInstallationRawService } from './pay-aba-installation/pay-aba-installation-raw.service';
import { PayAbaInstallationRequestDto } from './pay-aba-installation/pay-aba-installation-request.dto';
import { CheckIpRawService } from './check-ip/check-ip-raw.service';
import { CheckIpRequestDto } from './check-ip/check-ip-request.dto';
import { CreateAndProvisioningCustomerRawService } from './create-and-provisioning-customer/create-and-provisioning-customer-raw.service';
import { CreateAndProvisioningCustomerRequestDto } from './create-and-provisioning-customer/create-and-provisioning-customer-request.dto';
import { CreateAndProvisioningMasterAccountRawService } from './create-and-provisioning-master-account/create-and-provisioning-mater-account-raw.service';
import { CreateAndProvisioningMasterAccountRequestDto } from './create-and-provisioning-master-account/create-and-provisioning-master-account-request.dto';
import { CustomerExistsRequestDto } from './customer-exists/customer-exists-request.dto';
import { CustomerExistsRawService } from './customer-exists/customer-exists-raw.service';
import { DeleteOrderRawService } from './delete-order/delete-order-raw.service';
import { DeleteOrderRequestDto } from './delete-order/delete-order-request.dto';
import { DSLAuditLogsRequestDto } from './dsl-audit-logs/dsl-audit-logs-request.dto';
import { DSLAuditLogsRawService } from './dsl-audit-logs/dsl-audit-logs-raw.service';
import { GetAbaDataFromRequestsRawService } from './get-aba-data-from-requests/get-aba-data-from-requests-raw.service';
import { GetAbaDataFromRequestsRequestDto } from './get-aba-data-from-requests/get-aba-data-from-requests-request.dto';
import { GetAbaDataRawService } from './get-aba-data/get-aba-data-raw.service';
import { GetAbaDataRequestDto } from './get-aba-data/get-aba-data-request.dto';
import { GetAllValuesFromCustomerValuesRawService } from './get-all-values-from-customer-values/get-all-values-from-customer-values-raw.service';
import { GetAllValuesFromCustomerValuesRequestDto } from './get-all-values-from-customer-values/get-all-values-from-customer-values-request.dto';
import { GetAndRegisterQualifOfServiceDto } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-request.dto';
import { GetAndRegisterQualifOfServiceRawService } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-raw.service';
import { GetCustomerClassNameFromIdValueDto } from './get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-request.dto';
import { GetCustomerClassNameFromIdValueRawService } from './get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-raw.service';
import { GetCustomerInstanceIdFromIdValueRawService } from './get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-raw.service';
import { GetCustomerInstanceIdFromIdValueRequestDto } from './get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-request.dto';
import { GetCSIdAndPlanNameFromLoginRawService } from './get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-raw.service';
import { GetCSIdAndPlanNameFromLoginRequestDto } from './get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-request.dto';
import { GetDataFromDSLAMPortIdRequestDto } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-request.dto';
import { GetDataFromDSLAMPortIdRequestRawService } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-raw.service';
import { GetDebtFromCustomerRawService } from './get-debt-from-customer/get-debt-from-customer-raw.service';
import { GetDebtFromCustomerRequestDto } from './get-debt-from-customer/get-debt-from-customer-request.dto';
import { GetDownstreamFromPlanRawService } from './get-downstream-from-plan/get-downstream-from-plan-raw.service';
import { GetDownstreamFromPlanRequestDto } from './get-downstream-from-plan/get-downstream-from-plan-request.dto';
import { GetDSLAreaCodesRequestDto } from './get-dsl-area-codes/get-dsl-area-codes-request.dto';
import { GetDSLAreaCodesRawService } from './get-dsl-area-codes/get-dsl-area-codes-raw.service';
import { GetFirstLetterFromABARequestDto } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-request.dto';
import { GetFirstLetterFromABARequestRawService } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-raw.service';
import { GetGroupAccessFromLoginRawService } from './get-group-access-from-login/get-group-access-from-login-raw.service';
import { GetGroupAccessFromLoginRequestDto } from './get-group-access-from-login/get-group-access-from-login-request.dto';
import { GetOrderIdFromABASalesRequestDto } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales-request.dto';
import { GetOrderIdFromABASalesRawService } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales-raw.service';
import { GetPortIdRawService } from './get-port-id/get-port-id-raw.service';
import { GetPortIdRequestDto } from './get-port-id/get-port-id-request.dto';
import { GetPortIdFromIpRawService } from './get-port-id-from-ip/get-port-id-from-ip-raw.service';
import { GetPortIdFromIpRequestDto } from './get-port-id-from-ip/get-port-id-from-ip-request.dto';
import { GetStateFromSerialRequestDto } from './get-state-from-serial/get-state-from-serial-request.dto';
import { GetStateFromSerialRawService } from './get-state-from-serial/get-state-from-serial-raw.service';
import { HttpCodeConstants } from 'src/system/infrastructure/http/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IAbaRegisterResponse } from './aba-register/aba-register-response.interface';
import { IPayABAInstallationResponse } from './pay-aba-installation/pay-aba-installation-response.interface';
import { ICheckIpResponse } from './check-ip/check-ip-response.interface';
import { ICreateAndProvisioningCustomerResponse } from './create-and-provisioning-customer/create-and-provisioning-customer-response.interface';
import { ICreateAndProvisioningMasterAccountResponse } from './create-and-provisioning-master-account/create-and-provisioning-master-account-response.interface';
import { ICustomerExistsResponse } from './customer-exists/customer-exists-response.interface';
import { IDeleteOrderResponse } from './delete-order/delete-order-response.interface';
import { IDSLAuditLogsResponse } from './dsl-audit-logs/dsl-audit-logs-response.interface';
import { IGetAbaDataFromRequestsResponse } from './get-aba-data-from-requests/get-aba-data-from-requests-response.interface';
import { IGetAbaDataResponse } from './get-aba-data/get-aba-data-response.interface';
import { IGetAllValuesFromCustomerValuesResponse } from './get-all-values-from-customer-values/get-all-values-from-customer-values-response.interface';
import { IGetAndRegisterQualifOfServiceResponse } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-response.interface';
import { IGetCustomerClassNameFromIdValueResponse } from './get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-response.interface';
import { IGetCustomerInstanceIdFromIdValueResponse } from './get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-response.interface';
import { IGetCSIdAndPlanNameFromLoginResponse } from './get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-response.interface';
import { IGetDataFromDSLAMPortIdResponse } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-response.interface';
import { IGetDebtFromCustomerResponse } from './get-debt-from-customer/get-debt-from-customer-response.interface';
import { IGetDownstreamFromPlanResponse } from './get-downstream-from-plan/get-downstream-from-plan-response.interface';
import { IGetDSLAreaCodesResponse } from './get-dsl-area-codes/get-dsl-area-codes-response.interface';
import { IGetFirstLetterFromABARequestResponse } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-response.interface';
import { IGetGroupAccessFromLoginResponse } from './get-group-access-from-login/get-group-access-from-login-response.interface';
import { IGetOrderIdFromABASalesResponse } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales-response.interface';
import { IGetPortIdResponse } from './get-port-id/get-port-id-response.interface';
import { IGetPortIdFromIpResponse } from './get-port-id-from-ip/get-port-id-from-ip-response.interface';
import { IGetStateFromSerialResponse } from './get-state-from-serial/get-state-from-serial-response.interface';
import { IInsertDslAbaRegistersResponse } from './insert-dsl-aba-registers/insert-dsl-aba-registers-response.interface';
import { IIsIPAllowedResponse } from './is-ip-allowed/is-ip-allowed-response.interface';
import { IISGActionAllowedResponse } from './isg-action-allowed/isg-action-allowed-response.interface';
import { IIsOccupiedPortResponse } from './Is-occupied-port/is-occupied-port-response.interface';
import { IIsPrepaidVoiceLineResponse } from './is-prepaid-voice-line/is-prepaid-voice-line-response.interface';
import { IIsReservedLoginResponse } from './is-reserved-login/is-reserved-login-response.interface';
import { IIsValidIpAddressResponse } from './is-valid-ip-address/is-valid-ip-address-response.interface';
import { InsertDslAbaRegistersRawService } from './insert-dsl-aba-registers/insert-dsl-aba-registers-raw.service';
import { InsertDslAbaRegistersRequestDto } from './insert-dsl-aba-registers/insert-dsl-aba-registers-request.dto';
import { IPlansByCustomerClassListResponse } from './plans-by-customer-class/plans-by-customer-class-list-response.interface';
import { IReverseAbaRegisterResponse } from './reverse-aba-register/reverse-aba-register-response.interface';
import { IsReservedLoginRawService } from './is-reserved-login/is-reserved-login-raw.service';
import { ISGActionAllowedRawService } from './isg-action-allowed/isg-action-allowed-raw.service';
import { ISGActionAllowedRequestDto } from './isg-action-allowed/isg-action-allowed-request.dto';
import { IsIPAllowedRequestDto } from './is-ip-allowed/is-ip-allowed-request.dto';
import { IsIPAllowedRawService } from './is-ip-allowed/is-ip-allowed-raw.service';
import { IsOccupiedPortRawService } from './Is-occupied-port/Is-occupied-port-raw.service';
import { IsOccupiedPortRequestDto } from './Is-occupied-port/Is-occupied-port-request.dto';
import { IsPrepaidVoiceLineRawService } from './is-prepaid-voice-line/is-prepaid-voice-line-raw.service';
import { IsPrepaidVoiceLineRequestDto } from './is-prepaid-voice-line/is-prepaid-voice-line-request.dto';
import { IReadIABAOrderResponse } from './read-iaba-order/read-iaba-order-response.interface';
import { IsReservedLoginRequestDto } from './is-reserved-login/is-reserved-login-request.dto';
import { IsValidIpAddressRawService } from './is-valid-ip-address/is-valid-ip-address-raw.service';
import { IsValidIpAddressRequestDto } from './is-valid-ip-address/is-valid-ip-address-request.dto';
import { IUpdateDslAbaRegistersResponse } from './update-dsl-aba-registers/update-dsl-aba-registers-response.interface';
import { IVerifyContractByPhoneResponse } from './verify-contract-by-phone/verify-contract-by-phone-response.interface';
import { PlansByCustomerClassRequestDto } from './plans-by-customer-class/plans-by-customer-class-request.dto';
import { PlansByCustomerClassRawService } from './plans-by-customer-class/plans-by-customer-class-raw.service';
import { ReadIABAOrderRawService } from './read-iaba-order/read-iaba-order-raw.service';
import { ReadIABAOrderRequestDto } from './read-iaba-order/read-iaba-order-request.dto';
import { ReverseAbaRegisterRawService } from './reverse-aba-register/reverse-aba-register-raw.service';
import { ReverseAbaRegisterRequestDto } from './reverse-aba-register/reverse-aba-register-request.dto';
import { UpdateDslAbaRegistersRawService } from './update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { UpdateDslAbaRegistersRequestDto } from './update-dsl-aba-registers/update-dsl-aba-registers-request.dto';
import { UpdatePasswordFromLoginRequestDto } from './update-password-from-login/update-password-from-login-request.dto';
import { IUpdatePasswordFromLoginResponse } from './update-password-from-login/update-password-from-login-response.interface';
import { UpdatePasswordFromLoginRawService } from './update-password-from-login/update-password-from-login-raw.service';
import { VerifyContractByPhoneRawService } from './verify-contract-by-phone/verify-contract-by-phone-raw.service';
import { VerifyContractByPhoneRequestDto } from './verify-contract-by-phone/verify-contract-by-phone-request.dto';

@Controller({
  path: 'raw/sp',
  version: '1',
})
export class StoredProceduresRawController {
  constructor(
    private readonly abaRegisterRawService: AbaRegisterRawService,
    private readonly payAbaInstallationRawService: PayAbaInstallationRawService,
    private readonly checkIpRawService: CheckIpRawService,
    private readonly createAndProvisioningCustomerRawService: CreateAndProvisioningCustomerRawService,
    private readonly createAndProvisioningMasterAccountRawService: CreateAndProvisioningMasterAccountRawService,
    private readonly customerExistsRawService: CustomerExistsRawService,
    private readonly deleteOrderRawService: DeleteOrderRawService,
    private readonly dslAuditLogsService: DSLAuditLogsRawService,
    private readonly getAbaDataFromRequestsRawService: GetAbaDataFromRequestsRawService,
    private readonly getAbaDataRawService: GetAbaDataRawService,
    private readonly getAllValuesFromCustomerValuesRawService: GetAllValuesFromCustomerValuesRawService,
    private readonly getAndRegisterQualifOfServiceRawService: GetAndRegisterQualifOfServiceRawService,
    private readonly getCustomerClassNameFromIdValueRawService: GetCustomerClassNameFromIdValueRawService,
    private readonly getCustomerInstanceIdFromIdValueRawService: GetCustomerInstanceIdFromIdValueRawService,
    private readonly getCSIdAndPlanNameFromLoginRawService: GetCSIdAndPlanNameFromLoginRawService,
    private readonly getDataFromDSLAMPortIdRequestRawService: GetDataFromDSLAMPortIdRequestRawService,
    private readonly getDebtFromCustomerRawService: GetDebtFromCustomerRawService,
    private readonly getDownstreamFromPlanRawService: GetDownstreamFromPlanRawService,
    private readonly getDSLAreaCodesRawService: GetDSLAreaCodesRawService,
    private readonly getFirstLetterFromABARequestRawService: GetFirstLetterFromABARequestRawService,
    private readonly getGroupAccessFromLoginRawService: GetGroupAccessFromLoginRawService,
    private readonly getOrderIdFromABASalesRawService: GetOrderIdFromABASalesRawService,
    private readonly getPortIdRawService: GetPortIdRawService,
    private readonly getPortIdFromIpRawService: GetPortIdFromIpRawService,
    private readonly getStateFromSerialService: GetStateFromSerialRawService,
    private readonly insertDslAbaRegistersRawService: InsertDslAbaRegistersRawService,
    private readonly isIPAllowedRawService: IsIPAllowedRawService,
    private readonly isOccupiedPortRawService: IsOccupiedPortRawService,
    private readonly isPrepaidVoiceLineRawService: IsPrepaidVoiceLineRawService,
    private readonly isgActionAllowedRawService: ISGActionAllowedRawService,
    private readonly isReservedLoginRawService: IsReservedLoginRawService,
    private readonly isValidIpAddressRawService: IsValidIpAddressRawService,
    private readonly planByCustomerClassRawService: PlansByCustomerClassRawService,
    private readonly readIABAOrderRawService: ReadIABAOrderRawService,
    private readonly reverseAbaRegisterRawService: ReverseAbaRegisterRawService,
    private readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
    private readonly updatePasswordFromLoginRawService: UpdatePasswordFromLoginRawService,
    private readonly verifyContractByPhoneRawService: VerifyContractByPhoneRawService,
  ) {}
  @Post('abaRegister')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  abaRegister(
    @Body() dto: AbaRegisterRequestDto,
  ): Promise<IAbaRegisterResponse> {
    return this.abaRegisterRawService.execute(dto);
  }

  @Post('payAbaInstallation')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  payAbaInstallation(
    @Body() dto: PayAbaInstallationRequestDto,
  ): Promise<IPayABAInstallationResponse> {
    return this.payAbaInstallationRawService.execute(dto);
  }

  @Post('checkIp')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  checkIp(@Body() dto: CheckIpRequestDto): Promise<ICheckIpResponse> {
    return this.checkIpRawService.execute(dto);
  }

  @Post('createAndProvisioningCustomer')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  createAndProvisioningCustomer(
    @Body() dto: CreateAndProvisioningCustomerRequestDto,
  ): Promise<ICreateAndProvisioningCustomerResponse> {
    return this.createAndProvisioningCustomerRawService.execute(dto);
  }

  @Post('createAndProvisioningMasterAccount')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  createAndProvisioningMasterAccount(
    @Body() dto: CreateAndProvisioningMasterAccountRequestDto,
  ): Promise<ICreateAndProvisioningMasterAccountResponse> {
    return this.createAndProvisioningMasterAccountRawService.execute(dto);
  }

  @Post('customerExists')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  customerExists(
    @Body() dto: CustomerExistsRequestDto,
  ): Promise<ICustomerExistsResponse> {
    return this.customerExistsRawService.execute(dto);
  }

  @Post('deleteOrder')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  deleteOrder(
    @Body() dto: DeleteOrderRequestDto,
  ): Promise<IDeleteOrderResponse> {
    return this.deleteOrderRawService.execute(dto);
  }

  @Post('dslAuditLogs')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  dslAuditLogs(
    @Body() dto: DSLAuditLogsRequestDto,
  ): Promise<IDSLAuditLogsResponse> {
    return this.dslAuditLogsService.execute(dto);
  }

  @Post('getAbaData')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getAbaData(@Body() dto: GetAbaDataRequestDto): Promise<IGetAbaDataResponse> {
    return this.getAbaDataRawService.execute(dto);
  }

  @Post('getAbaDataFromRequests')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getAbaDataFromRequests(
    @Body() dto: GetAbaDataFromRequestsRequestDto,
  ): Promise<IGetAbaDataFromRequestsResponse> {
    return this.getAbaDataFromRequestsRawService.execute(dto);
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

  @Post('getCSIdAndPlanNameFromLogin')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getCSIdAndPlanNameFromLogin(
    @Body() dto: GetCSIdAndPlanNameFromLoginRequestDto,
  ): Promise<IGetCSIdAndPlanNameFromLoginResponse> {
    return this.getCSIdAndPlanNameFromLoginRawService.execute(dto);
  }

  @Post('getDataFromDSLAMPortIdRequest')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getDataFromDSLAMPortIdRequest(
    @Body() dto: GetDataFromDSLAMPortIdRequestDto,
  ): Promise<IGetDataFromDSLAMPortIdResponse> {
    return this.getDataFromDSLAMPortIdRequestRawService.execute(dto);
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

  @Post('getDownstreamFromPlan')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getDownstreamFromPlan(
    @Body() dto: GetDownstreamFromPlanRequestDto,
  ): Promise<IGetDownstreamFromPlanResponse> {
    return this.getDownstreamFromPlanRawService.execute(dto);
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

  @Post('getPortId')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getPortId(@Body() dto: GetPortIdRequestDto): Promise<IGetPortIdResponse> {
    return this.getPortIdRawService.execute(dto);
  }

  @Post('getPortIdFromIp')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  getPortIdFromIp(
    @Body() dto: GetPortIdFromIpRequestDto,
  ): Promise<IGetPortIdFromIpResponse> {
    return this.getPortIdFromIpRawService.execute(dto);
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

  @Post('isOccupiedPort')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isOccupiedPort(
    @Body() dto: IsOccupiedPortRequestDto,
  ): Promise<IIsOccupiedPortResponse> {
    return this.isOccupiedPortRawService.execute(dto);
  }

  @Post('isPrepaidVoiceLine')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isPrepaidVoiceLine(
    @Body() dto: IsPrepaidVoiceLineRequestDto,
  ): Promise<IIsPrepaidVoiceLineResponse> {
    return this.isPrepaidVoiceLineRawService.execute(dto);
  }

  @Post('isReservedLogin')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isReservedLogin(
    @Body() dto: IsReservedLoginRequestDto,
  ): Promise<IIsReservedLoginResponse> {
    return this.isReservedLoginRawService.execute(dto);
  }

  @Post('isValidIpAddress')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  isValidIpAddress(
    @Body() dto: IsValidIpAddressRequestDto,
  ): Promise<IIsValidIpAddressResponse> {
    return this.isValidIpAddressRawService.execute(dto);
  }

  @Post('planByCustomerClass')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  planByCustomerClass(
    @Body() dto: PlansByCustomerClassRequestDto,
  ): Promise<IPlansByCustomerClassListResponse> {
    return this.planByCustomerClassRawService.execute(dto);
  }

  @Post('reverseAbaRegister')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  reverseAbaRegister(
    @Body() dto: ReverseAbaRegisterRequestDto,
  ): Promise<IReverseAbaRegisterResponse> {
    return this.reverseAbaRegisterRawService.execute(dto, null, true);
  }

  @Post('readIABAOrder')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  readIABAOrder(
    @Body() dto: ReadIABAOrderRequestDto,
  ): Promise<IReadIABAOrderResponse> {
    return this.readIABAOrderRawService.execute(dto);
  }

  @Post('updateDslAbaRegisters')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  updateDslAbaRegisters(
    @Body() dto: UpdateDslAbaRegistersRequestDto,
  ): Promise<IUpdateDslAbaRegistersResponse> {
    console.log();
    console.log('updateDslAbaRegisters controller method');
    // updateDslAbaRegisters
    return this.updateDslAbaRegistersRawService.execute(dto);
  }

  @Post('updatePasswordFromLogin')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  updatePasswordFromLogin(
    @Body() dto: UpdatePasswordFromLoginRequestDto,
  ): Promise<IUpdatePasswordFromLoginResponse> {
    return this.updatePasswordFromLoginRawService.execute(dto);
  }

  @Post('verifyContractByPhone')
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  verifyContractByPhone(
    @Body() dto: VerifyContractByPhoneRequestDto,
  ): Promise<IVerifyContractByPhoneResponse> {
    return this.verifyContractByPhoneRawService.execute(dto);
  }
}
