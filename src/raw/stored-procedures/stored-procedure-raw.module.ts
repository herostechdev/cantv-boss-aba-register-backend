import { Global, Module } from '@nestjs/common';
import { CustomerExistsRawService } from './customer-exists/customer-exists-raw.service';
import { GetAllValuesFromCustomerValuesRawService } from './get-all-values-from-customer-values/get-all-values-from-customer-values-raw.service';
import { GetAndRegisterQualifOfServiceRawService } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-raw.service';
import { GetCustomerClassNameFromIdValueRawService } from './get-customer-class-name-from-id-value/get-customer-class-name-from-id-value-raw.service';
import { GetCustomerInstanceIdFromIdValueRawService } from './get-customer-instance-id-from-id-value/get-customer-instance-id-from-id-value-raw.service';
import { GetDebtFromCustomerRawService } from './get-debt-from-customer/get-debt-from-customer-raw.service';
import { GetDSLAreaCodesRawService } from './get-dsl-area-codes/get-dsl-area-codes-raw.service';
import { GetFirstLetterFromABARequestRawService } from './get-first-letter-from-aba-request/get-first-letter-from-aba-request-raw.service';
import { GetGroupAccessFromLoginRawService } from './get-group-access-from-login/get-group-access-from-login-raw.service';
import { GetOrderIdFromABASalesRawService } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales-raw.service';
import { InsertDslAbaRegistersRawService } from './insert-dsl-aba-registers/insert-dsl-aba-registers-raw.service';
import { ISGActionAllowedRawService } from './isg-action-allowed/isg-action-allowed-raw.service';
import { IsIPAllowedRawService } from './is-ip-allowed/is-ip-allowed-raw.service';
import { IsPrepaidVoiceLineRawService } from './is-prepaid-voice-line/is-prepaid-voice-line-raw.service';
import { StoredProceduresRawController } from './stored-procedures-raw.controller';
import { UpdateDslAbaRegistersRawService } from './update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Global()
@Module({
  imports: [],
  controllers: [StoredProceduresRawController],
  providers: [
    CustomerExistsRawService,
    GetAllValuesFromCustomerValuesRawService,
    GetAndRegisterQualifOfServiceRawService,
    GetCustomerClassNameFromIdValueRawService,
    GetCustomerInstanceIdFromIdValueRawService,
    GetDebtFromCustomerRawService,
    GetDSLAreaCodesRawService,
    GetFirstLetterFromABARequestRawService,
    GetGroupAccessFromLoginRawService,
    GetOrderIdFromABASalesRawService,
    InsertDslAbaRegistersRawService,
    IsIPAllowedRawService,
    ISGActionAllowedRawService,
    IsPrepaidVoiceLineRawService,
    UpdateDslAbaRegistersRawService,
  ],
  exports: [
    CustomerExistsRawService,
    GetAllValuesFromCustomerValuesRawService,
    GetAndRegisterQualifOfServiceRawService,
    GetCustomerClassNameFromIdValueRawService,
    GetCustomerInstanceIdFromIdValueRawService,
    GetDebtFromCustomerRawService,
    GetDSLAreaCodesRawService,
    GetFirstLetterFromABARequestRawService,
    GetGroupAccessFromLoginRawService,
    GetOrderIdFromABASalesRawService,
    InsertDslAbaRegistersRawService,
    IsIPAllowedRawService,
    ISGActionAllowedRawService,
    IsPrepaidVoiceLineRawService,
    UpdateDslAbaRegistersRawService,
  ],
})
export class StoredproceduresRawModule {}
