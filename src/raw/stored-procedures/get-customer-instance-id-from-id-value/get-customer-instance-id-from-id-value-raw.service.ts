import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetCustomerInstanceIdFromIdValueException } from './get-customer-instance-id-from-id-value.exception';
import { GetCustomerInstanceIdFromIdValueRequestDto } from './get-customer-instance-id-from-id-value-request.dto';
import { GetCustomerInstanceIdFromIdValueStatusConstants } from './get-customer-instance-id-from-id-value-status.constants';
import { IGetCustomerInstanceIdFromIdValueResponse } from './get-customer-instance-id-from-id-value-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetCustomerInstanceIdFromIdValueRawService extends OracleExecuteStoredProcedureRawService<
  GetCustomerInstanceIdFromIdValueRequestDto,
  IGetCustomerInstanceIdFromIdValueResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_CUSTOMER_INSTANCE_ID_FROM_ID_VALUE,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(
    dto: GetCustomerInstanceIdFromIdValueRequestDto,
  ): any {
    return {
      sz_IdValue: OracleHelper.stringBindIn(dto.value, 256),
      sz_Cltattributename: OracleHelper.stringBindIn(
        dto.customerAttributeName,
        256,
      ),

      l_cltinstanceid: OracleHelper.numberBindOut(),
      status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(
    result: any,
  ): IGetCustomerInstanceIdFromIdValueResponse {
    const response = {
      customerInstanceId: result?.outBinds?.l_cltinstanceid,
      status: (result?.outBinds?.status ??
        GetCustomerInstanceIdFromIdValueStatusConstants.ERROR) as GetCustomerInstanceIdFromIdValueStatusConstants,
    };
    switch (response.status) {
      case GetCustomerInstanceIdFromIdValueStatusConstants.SUCCESSFULL:
        return response;
      case GetCustomerInstanceIdFromIdValueStatusConstants.ERROR:
        throw new GetCustomerInstanceIdFromIdValueException();
      case GetCustomerInstanceIdFromIdValueStatusConstants.THERE_IS_NO_DATA:
        // throw new GetCustomerInstanceIdFromIdValueThereIsNoDataException();
        return response;
      default:
        throw new GetCustomerInstanceIdFromIdValueException();
    }
  }
}
