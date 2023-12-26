import { Global, Module } from '@nestjs/common';
import { GetGroupAccessFromLoginRawService } from './get-group-access-from-login/get-group-access-from-login-raw.service';
import { GetOrderIdFromABASalesRawService } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales-raw.service';
import { ISGActionAllowedRawService } from './isg-action-allowed/isg-action-allowed-raw.service';
import { IsIPAllowedRawService } from './is-ip-allowed/is-ip-allowed-raw.service';
import { StoredProceduresRawController } from './stored-procedures-raw.controller';
import { GetDSLAreaCodesRawService } from './get-dsl-area-codes/get-dsl-area-codes-raw.service';

@Global()
@Module({
  imports: [],
  controllers: [StoredProceduresRawController],
  providers: [
    GetDSLAreaCodesRawService,
    GetGroupAccessFromLoginRawService,
    GetOrderIdFromABASalesRawService,
    IsIPAllowedRawService,
    ISGActionAllowedRawService,
  ],
  exports: [
    GetDSLAreaCodesRawService,
    GetGroupAccessFromLoginRawService,
    GetOrderIdFromABASalesRawService,
    IsIPAllowedRawService,
    ISGActionAllowedRawService,
  ],
})
export class StoredproceduresRawModule {}
