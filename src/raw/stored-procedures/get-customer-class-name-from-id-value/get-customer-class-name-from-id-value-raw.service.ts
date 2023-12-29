import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { GetCustomerClassNameFromIdValueDto } from './get-customer-class-name-from-id-value-request.dto';
import { GetCustomerClassNameFromIdValueStatusConstants } from './get-customer-class-name-from-id-value-status.constants';
import { GetCustomerClassNameFromIdValueException } from './get-customer-class-name-from-id-value.exception';
import { IGetCustomerClassNameFromIdValueResponse } from './get-customer-class-name-from-id-value-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetCustomerClassNameFromIdValueRawService extends OracleExecuteStoredProcedureRawService<
  GetCustomerClassNameFromIdValueDto,
  IGetCustomerClassNameFromIdValueResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_CUSTOMER_CLASS_NAME_FROM_ID_VALUE,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: GetCustomerClassNameFromIdValueDto): any {
    return {
      sz_IdValue: OracleHelper.stringBindIn(dto.value, 256),
      sz_Cltattributename: OracleHelper.stringBindIn(dto.customerAttributeName),

      sz_Cltclassname: OracleHelper.stringBindOut(1),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetCustomerClassNameFromIdValueResponse {
    const response = {
      customerClassName: result?.outBinds?.sz_Cltclassname,
      status: (result?.outBinds?.o_status ??
        GetCustomerClassNameFromIdValueStatusConstants.ERROR) as GetCustomerClassNameFromIdValueStatusConstants,
    };
    switch (response.status) {
      case GetCustomerClassNameFromIdValueStatusConstants.SUCCESSFULL:
        return response;
      case GetCustomerClassNameFromIdValueStatusConstants.ERROR:
        throw new GetCustomerClassNameFromIdValueException();
      case GetCustomerClassNameFromIdValueStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetCustomerClassNameFromIdValueException();
    }
  }
}
