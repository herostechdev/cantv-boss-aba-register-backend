import { Module } from '@nestjs/common';
import { AbaRegisterRawService } from './aba-register/aba-register-raw.service';
import { PayAbaInstallationRawService } from './pay-aba-installation/pay-aba-installation-raw.service';
import { CheckIpRawService } from './check-ip/check-ip-raw.service';
import { CreateAndProvisioningCustomerRawService } from './create-and-provisioning-customer/create-and-provisioning-customer-raw.service';
import { CreateAndProvisioningMasterAccountRawService } from './create-and-provisioning-master-account/create-and-provisioning-mater-account-raw.service';
import { CustomerExistsRawService } from './customer-exists/customer-exists-raw.service';
import { DeleteOrderRawService } from './delete-order/delete-order-raw.service';
import { DSLAuditLogsRawService } from './dsl-audit-logs/dsl-audit-logs-raw.service';
import { GetAbaDataRawService } from './get-aba-data/get-aba-data-raw.service';
import { GetAbaDataFromRequestsRawService } from 'src/raw/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-raw.service';
import { GetAllValuesFromCustomerValuesRawService } from './get-all-values-from-customer-values/get-all-values-from-customer-values-raw.service';
import { GetAndRegisterQualifOfServiceRawService } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-raw.service';
import { GetCustomerClassNameFromIdValueRawService } from './get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-raw.service';
import { GetCustomerInstanceIdFromIdValueRawService } from './get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-raw.service';
import { GetCSIdAndPlanNameFromLoginRawService } from './get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-raw.service';
import { GetDataFromDSLAMPortIdRequestRawService } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-raw.service';
import { GetDebtFromCustomerRawService } from './get-debt-from-customer/get-debt-from-customer-raw.service';
import { GetDownstreamFromPlanRawService } from './get-downstream-from-plan/get-downstream-from-plan-raw.service';
import { GetDSLAreaCodesRawService } from './get-dsl-area-codes/get-dsl-area-codes-raw.service';
import { GetFirstLetterFromABARequestRawService } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-raw.service';
import { GetGroupAccessFromLoginRawService } from './get-group-access-from-login/get-group-access-from-login-raw.service';
import { GetOrderIdFromABASalesRawService } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales-raw.service';
import { GetPortIdRawService } from './get-port-id/get-port-id-raw.service';
import { GetPortIdFromIpRawService } from './get-port-id-from-ip/get-port-id-from-ip-raw.service';
import { GetStateFromSerialRawService } from './get-state-from-serial/get-state-from-serial-raw.service';
import { InsertDslAbaRegistersRawService } from './insert-dsl-aba-registers/insert-dsl-aba-registers-raw.service';
import { ISGActionAllowedRawService } from './isg-action-allowed/isg-action-allowed-raw.service';
import { IsIPAllowedRawService } from './is-ip-allowed/is-ip-allowed-raw.service';
import { IsOccupiedPortRawService } from './Is-occupied-port/Is-occupied-port-raw.service';
import { IsPrepaidVoiceLineRawService } from './is-prepaid-voice-line/is-prepaid-voice-line-raw.service';
import { IsReservedLoginRawService } from './is-reserved-login/is-reserved-login-raw.service';
import { IsValidIpAddressRawService } from './is-valid-ip-address/is-valid-ip-address-raw.service';
import { PlansByCustomerClassRawService } from './plans-by-customer-class/plans-by-customer-class-raw.service';
import { ReverseAbaRegisterRawService } from './reverse-aba-register/reverse-aba-register-raw.service';
import { StoredProceduresRawController } from './stored-procedures-raw.controller';
import { UpdateDslAbaRegistersRawService } from './update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { UpdatePasswordFromLoginRawService } from './update-password-from-login/update-password-from-login-raw.service';
import { VerifyContractByPhoneRawService } from './verify-contract-by-phone/verify-contract-by-phone-raw.service';

@Module({
  imports: [],
  controllers: [StoredProceduresRawController],
  providers: [
    AbaRegisterRawService,
    PayAbaInstallationRawService,
    CheckIpRawService,
    CreateAndProvisioningCustomerRawService,
    CreateAndProvisioningMasterAccountRawService,
    CustomerExistsRawService,
    DeleteOrderRawService,
    DSLAuditLogsRawService,
    GetAbaDataFromRequestsRawService,
    GetAbaDataRawService,
    GetAllValuesFromCustomerValuesRawService,
    GetAndRegisterQualifOfServiceRawService,
    GetCustomerClassNameFromIdValueRawService,
    GetCustomerInstanceIdFromIdValueRawService,
    GetCSIdAndPlanNameFromLoginRawService,
    GetDataFromDSLAMPortIdRequestRawService,
    GetDebtFromCustomerRawService,
    GetDownstreamFromPlanRawService,
    GetDSLAreaCodesRawService,
    GetFirstLetterFromABARequestRawService,
    GetGroupAccessFromLoginRawService,
    GetOrderIdFromABASalesRawService,
    GetPortIdRawService,
    GetPortIdFromIpRawService,
    GetStateFromSerialRawService,
    InsertDslAbaRegistersRawService,
    IsIPAllowedRawService,
    ISGActionAllowedRawService,
    IsOccupiedPortRawService,
    IsPrepaidVoiceLineRawService,
    IsReservedLoginRawService,
    IsValidIpAddressRawService,
    PlansByCustomerClassRawService,
    ReverseAbaRegisterRawService,
    UpdateDslAbaRegistersRawService,
    UpdatePasswordFromLoginRawService,
    VerifyContractByPhoneRawService,
  ],
  exports: [
    AbaRegisterRawService,
    PayAbaInstallationRawService,
    CheckIpRawService,
    CreateAndProvisioningCustomerRawService,
    CreateAndProvisioningMasterAccountRawService,
    CustomerExistsRawService,
    DeleteOrderRawService,
    DSLAuditLogsRawService,
    GetAbaDataFromRequestsRawService,
    GetAbaDataRawService,
    GetAllValuesFromCustomerValuesRawService,
    GetAndRegisterQualifOfServiceRawService,
    GetCustomerClassNameFromIdValueRawService,
    GetCustomerInstanceIdFromIdValueRawService,
    GetCSIdAndPlanNameFromLoginRawService,
    GetDataFromDSLAMPortIdRequestRawService,
    GetDebtFromCustomerRawService,
    GetDownstreamFromPlanRawService,
    GetDSLAreaCodesRawService,
    GetFirstLetterFromABARequestRawService,
    GetGroupAccessFromLoginRawService,
    GetOrderIdFromABASalesRawService,
    GetPortIdRawService,
    GetPortIdFromIpRawService,
    GetStateFromSerialRawService,
    InsertDslAbaRegistersRawService,
    IsIPAllowedRawService,
    ISGActionAllowedRawService,
    IsOccupiedPortRawService,
    IsPrepaidVoiceLineRawService,
    IsReservedLoginRawService,
    IsValidIpAddressRawService,
    PlansByCustomerClassRawService,
    ReverseAbaRegisterRawService,
    UpdateDslAbaRegistersRawService,
    UpdatePasswordFromLoginRawService,
    VerifyContractByPhoneRawService,
  ],
})
export class StoredProceduresRawModule {}
