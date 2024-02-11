import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetOrderIdFromABASalesRequestDto } from './get-order-id-from-aba-sales-request.dto';
import { GetOrderIdFromABASalesStatusConstants } from './get-order-id-from-aba-sales-status.constants';
import { IGetOrderIdFromABASalesResponse } from './get-order-id-from-aba-sales-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetOrderIdFromABASalesRawService extends OracleExecuteStoredProcedureRawService<
  GetOrderIdFromABASalesRequestDto,
  IGetOrderIdFromABASalesResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_ORDER_ID_FROM_ABA_SALES,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: GetOrderIdFromABASalesRequestDto): any {
    return {
      str_areacode: OracleHelper.stringBindIn(dto.areaCode),
      str_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber),

      str_orderid: OracleHelper.numberBindOut(),
      str_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetOrderIdFromABASalesResponse {
    return {
      orderId: result?.outBinds?.str_orderid,
      status: (result?.outBinds?.str_status ??
        GetOrderIdFromABASalesStatusConstants.ERROR) as GetOrderIdFromABASalesStatusConstants,
    };
  }
}
