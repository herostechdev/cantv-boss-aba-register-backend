import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { CustomerExistsException } from './customer-exists.exception';
import { CustomerExistsRequestDto } from './customer-exists-request.dto';
import { CustomerExistsStatusConstants } from './customer-exists-status.constants';
import { ICustomerExistsResponse } from './customer-exists-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class CustomerExistsRawService extends OracleExecuteStoredProcedureRawService<
  CustomerExistsRequestDto,
  ICustomerExistsResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.CUSTOMER_EXISTS,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  // async clientExists(
  //   dto: CustomerExistsRequestDto,
  //   dbConnection?: Connection,
  // ): Promise<ICustomerExistsResponse> {
  //   try {
  //     await super.connect(dbConnection);
  // const parameters = {
  //   sz_attributename: OracleHelper.stringBindIn(dto.attributeName),
  //   sz_attributevalue: OracleHelper.stringBindIn(dto.attributeValue),
  //   sz_cltclassname: OracleHelper.stringBindOut(),
  //   status: OracleHelper.numberBindOut(),
  // };
  //     const result = await super.executeStoredProcedure(
  //       BossConstants.ACT_PACKAGE,
  //       BossConstants.CUSTOMER_EXISTS,
  //       parameters,
  //     );
  // const response: ICustomerExistsResponse = {
  //   customerClassName: result?.outBinds?.sz_cltclassname,
  //   status: (result?.outBinds?.status ??
  //     CustomerExistsStatusConstants.ERROR) as CustomerExistsStatusConstants,
  // };
  //     switch (response.status) {
  //       case CustomerExistsStatusConstants.SUCCESSFULL:
  //         return response;
  //       case CustomerExistsStatusConstants.ERROR:
  //         throw new CustomerExistsException();
  //       case CustomerExistsStatusConstants.THERE_IS_NO_DATA:
  //         return response;
  //       default:
  //         throw new CustomerExistsException();
  //     }
  //   } catch (error) {
  //     super.exceptionHandler(error, `${JSON.stringify(dto)}`);
  //   } finally {
  //     await this.closeConnection(ValidationHelper.isDefined(dbConnection));
  //   }
  // }

  protected getParameters(dto: CustomerExistsRequestDto): any {
    return {
      sz_attributename: OracleHelper.stringBindIn(dto.attributeName),
      sz_attributevalue: OracleHelper.stringBindIn(dto.attributeValue),

      sz_cltclassname: OracleHelper.stringBindOut(),
      status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): ICustomerExistsResponse {
    const response = {
      customerClassName: result?.outBinds?.sz_cltclassname,
      status: (result?.outBinds?.status ??
        CustomerExistsStatusConstants.ERROR) as CustomerExistsStatusConstants,
    };
    switch (response.status) {
      case CustomerExistsStatusConstants.SUCCESSFULL:
        return response;
      case CustomerExistsStatusConstants.ERROR:
        throw new CustomerExistsException();
      case CustomerExistsStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new CustomerExistsException();
    }
  }
}
