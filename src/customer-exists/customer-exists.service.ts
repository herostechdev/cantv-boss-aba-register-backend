import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { CustomerExistsInternalErrorException } from './customer-exists-internal-error.exception';
import { CustomerExistsRequestDto } from './customer-exists-request.dto';
import { CustomerExistsStatusConstants } from './customer-exists-status.constants';
import { ICustomerExistsResponse } from './customer-exists-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';

@Injectable()
export class CustomerExistsService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async clientExists(
    dto: CustomerExistsRequestDto,
  ): Promise<ICustomerExistsResponse> {
    const parameters = {
      sz_attributename: OracleHelper.stringBindIn(dto.attributeName),
      sz_attributevalue: OracleHelper.stringBindIn(dto.attributeValue),
      sz_cltclassname: OracleHelper.stringBindOut(),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.CUSTOMER_EXISTS,
      parameters,
    );
    const response: ICustomerExistsResponse = {
      customerClassName: result?.outBinds?.sz_cltclassname,
      status: (result?.outBinds?.status ??
        CustomerExistsStatusConstants.INTERNAL_ERROR) as CustomerExistsStatusConstants,
    };
    switch (response.status) {
      case CustomerExistsStatusConstants.SUCCESSFULL:
        return response;
      case CustomerExistsStatusConstants.INTERNAL_ERROR:
        throw new CustomerExistsInternalErrorException();
      case CustomerExistsStatusConstants.THERE_IS_NO_DATA:
        // throw new CustomerExistsThereIsNoDataException();
        return response;
      default:
        throw new CustomerExistsInternalErrorException();
    }
  }
}
