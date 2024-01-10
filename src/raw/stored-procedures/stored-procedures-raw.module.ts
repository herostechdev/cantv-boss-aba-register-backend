import { Module } from '@nestjs/common';
import { AbaRegisterRawService } from './aba-register/aba-register-raw.service';
import { CancelAbaInstallationRawService } from './cancel-aba-installation/cancel-aba-installation-raw.service';
import { CustomerExistsRawService } from './customer-exists/customer-exists-raw.service';
import { DSLAuditLogsRawService } from './dsl-audit-logs/dsl-audit-logs-raw.service';
import { GetAllValuesFromCustomerValuesRawService } from './get-all-values-from-customer-values/get-all-values-from-customer-values-raw.service';
import { GetAndRegisterQualifOfServiceRawService } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-raw.service';
import { GetCustomerClassNameFromIdValueRawService } from './get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-raw.service';
import { GetCustomerInstanceIdFromIdValueRawService } from './get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-raw.service';
import { GetCSIdAndPlanNameFromLoginRawService } from './get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-raw.service';
import { GetDebtFromCustomerRawService } from './get-debt-from-customer/get-debt-from-customer-raw.service';
import { GetDSLAreaCodesRawService } from './get-dsl-area-codes/get-dsl-area-codes-raw.service';
import { GetFirstLetterFromABARequestRawService } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-raw.service';
import { GetGroupAccessFromLoginRawService } from './get-group-access-from-login/get-group-access-from-login-raw.service';
import { GetOrderIdFromABASalesRawService } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales-raw.service';
import { GetStateFromSerialRawService } from './insert-dsl-aba-registers/get-state-from-serial/get-state-from-serial-raw.service';
import { InsertDslAbaRegistersRawService } from './insert-dsl-aba-registers/insert-dsl-aba-registers-raw.service';
import { ISGActionAllowedRawService } from './isg-action-allowed/isg-action-allowed-raw.service';
import { IsIPAllowedRawService } from './is-ip-allowed/is-ip-allowed-raw.service';
import { IsPrepaidVoiceLineRawService } from './is-prepaid-voice-line/is-prepaid-voice-line-raw.service';
import { IsReservedLoginRawService } from './is-reserved-login/is-reserved-login-raw.service';
import { PlansByCustomerClassRawService } from './plans-by-customer-class/plans-by-customer-class-raw.service';
import { StoredProceduresRawController } from './stored-procedures-raw.controller';
import { UpdateDslAbaRegistersRawService } from './update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Module({
  imports: [],
  controllers: [StoredProceduresRawController],
  providers: [
    AbaRegisterRawService,
    CancelAbaInstallationRawService,
    CustomerExistsRawService,
    DSLAuditLogsRawService,
    GetAllValuesFromCustomerValuesRawService,
    GetAndRegisterQualifOfServiceRawService,
    GetCustomerClassNameFromIdValueRawService,
    GetCustomerInstanceIdFromIdValueRawService,
    GetCSIdAndPlanNameFromLoginRawService,
    GetDebtFromCustomerRawService,
    GetDSLAreaCodesRawService,
    GetFirstLetterFromABARequestRawService,
    GetGroupAccessFromLoginRawService,
    GetOrderIdFromABASalesRawService,
    GetStateFromSerialRawService,
    InsertDslAbaRegistersRawService,
    IsIPAllowedRawService,
    ISGActionAllowedRawService,
    IsPrepaidVoiceLineRawService,
    IsReservedLoginRawService,
    PlansByCustomerClassRawService,
    UpdateDslAbaRegistersRawService,
  ],
  exports: [
    AbaRegisterRawService,
    CancelAbaInstallationRawService,
    CustomerExistsRawService,
    DSLAuditLogsRawService,
    GetAllValuesFromCustomerValuesRawService,
    GetAndRegisterQualifOfServiceRawService,
    GetCustomerClassNameFromIdValueRawService,
    GetCustomerInstanceIdFromIdValueRawService,
    GetCSIdAndPlanNameFromLoginRawService,
    GetDebtFromCustomerRawService,
    GetDSLAreaCodesRawService,
    GetFirstLetterFromABARequestRawService,
    GetGroupAccessFromLoginRawService,
    GetOrderIdFromABASalesRawService,
    GetStateFromSerialRawService,
    InsertDslAbaRegistersRawService,
    IsIPAllowedRawService,
    ISGActionAllowedRawService,
    IsPrepaidVoiceLineRawService,
    IsReservedLoginRawService,
    PlansByCustomerClassRawService,
    UpdateDslAbaRegistersRawService,
  ],
})
export class StoredProceduresRawModule {}
