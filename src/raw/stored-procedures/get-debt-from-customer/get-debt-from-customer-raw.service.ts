import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { GetDebtFromCustomerException } from './get-debt-from-customer.exception';
import { GetDebtFromCustomerRequestDto } from './get-debt-from-customer-request.dto';
import { GetDebtFromCustomerStatusConstants } from './get-debt-from-customer-status.constants';
import { IGetDebtFromCustomerResponse } from './get-debt-from-customer-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetDebtFromCustomerRawService extends OracleExecuteStoredProcedureRawService<
  GetDebtFromCustomerRequestDto,
  IGetDebtFromCustomerResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_DEBT_FROM_CUSTOMER,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: GetDebtFromCustomerRequestDto): any {
    return {
      l_cltinstanceid: OracleHelper.numberBindIn(dto.customerInstanceId),

      d_Amount: OracleHelper.numberBindOut(),
      status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetDebtFromCustomerResponse {
    const response: IGetDebtFromCustomerResponse = {
      amount: result?.outBinds?.d_Amount,
      status: (result?.outBinds?.status ??
        GetDebtFromCustomerStatusConstants.ERROR) as GetDebtFromCustomerStatusConstants,
    };
    switch (response.status) {
      case GetDebtFromCustomerStatusConstants.SUCCESSFULL:
        return response;
      case GetDebtFromCustomerStatusConstants.ERROR:
        throw new GetDebtFromCustomerException();
      case GetDebtFromCustomerStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetDebtFromCustomerException();
    }
  }
}
