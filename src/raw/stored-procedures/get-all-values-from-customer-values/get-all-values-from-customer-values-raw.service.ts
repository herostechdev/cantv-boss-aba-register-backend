import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetAllValuesFromCustomerValuesException } from './get-all-values-from-customer-values.exception';
import { GetAllValuesFromCustomerValuesRequestDto } from './get-all-values-from-customer-values-request.dto';
import { GetAllValuesFromCustomerValuesStatusConstants } from './get-all-values-from-customer-values-status.constants';
import { IGetAllValuesFromCustomerValuesResponse } from './get-all-values-from-customer-values-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetAllValuesFromCustomerValuesRawService extends OracleExecuteStoredProcedureRawService<
  GetAllValuesFromCustomerValuesRequestDto,
  IGetAllValuesFromCustomerValuesResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.SIGS_PACKAGE,
      BossConstants.GET_ALL_VALUES_FROM_CUSTOMER_VALUES,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: GetAllValuesFromCustomerValuesRequestDto): any {
    return {
      classname: OracleHelper.stringBindIn(dto.className),
      attrname: OracleHelper.stringBindIn(dto.attributeName),
      avalue: OracleHelper.stringBindIn(dto.value),

      aname: OracleHelper.tableOfStringBindOut(),
      cltvalue: OracleHelper.tableOfStringBindOut(),
      status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(result: any): IGetAllValuesFromCustomerValuesResponse {
    const response = {
      name: OracleHelper.getItems(result, 'aname'),
      value: OracleHelper.getItems(result, 'cltvalue'),
      status: (OracleHelper.getFirstItem(result, 'status') ??
        GetAllValuesFromCustomerValuesStatusConstants.INTERNAL_ERROR) as GetAllValuesFromCustomerValuesStatusConstants,
    };
    switch (response.status) {
      case GetAllValuesFromCustomerValuesStatusConstants.SUCCESSFULL:
        return response;
      case GetAllValuesFromCustomerValuesStatusConstants.INTERNAL_ERROR:
        throw new GetAllValuesFromCustomerValuesException();
      case GetAllValuesFromCustomerValuesStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetAllValuesFromCustomerValuesException();
    }
    return response;
  }
}
