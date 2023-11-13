import { Injectable } from '@nestjs/common';
import { CustomerExistsStatusConstants } from './customer-exists-status.constants';
import { CustomerExistsInternalErrorException } from './customer-exists-internal-error.exception';
import { ICustomerExistsResponse } from './customer-exists-response.interface';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';

@Injectable()
export class CustomerExistsService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  // TODO: Determinar origen del parámetro: attributeName
  // TODO: Determinar origen del parámetro: attributeValue
  // TODO: Verificar gestión de errores (resuelto segun acuerdo de gestión de errores 27/10/2023)

  // respuesta segun flujo bpm
  async clientExists(
    attributeName: string,
    attributeValue: string,
  ): Promise<ICustomerExistsResponse> {
    const parameters = {
      sz_attributename: OracleHelper.stringBindIn(attributeName),
      sz_attributevalue: OracleHelper.stringBindIn(attributeValue),
      sz_cltclassname: OracleHelper.stringBindOut(),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ACT_PACKAGE,
      OracleConstants.CUSTOMER_EXISTS,
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
