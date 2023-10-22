import { Injectable } from '@nestjs/common';
import { ClientExistsStatusConstants } from './client-exists-status.constants';
import { ClientExistsInternalErrorException } from './client-exists-internal-error.exception';
import { ClientExistsThereIsNoDataException } from './client-exists-there-is-no-data.exception';
import { IClientExistsResponse } from './client-exists-response.interface';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';

@Injectable()
export class ClientExistsService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  // TODO: Determinar origen del parámetro: attributeName
  // TODO: Determinar origen del parámetro: attributeValue
  // TODO: Verificar gestión de errores
  async clientExists(
    attributeName: string,
    attributeValue: string,
  ): Promise<IClientExistsResponse> {
    const parameters = {
      sz_attributename: OracleHelper.stringBindIn(attributeName),
      sz_attributevalue: OracleHelper.stringBindIn(attributeValue),
      status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      null,
      OracleConstants.CLIENT_EXISTS,
      parameters,
    );
    const response: IClientExistsResponse = {
      status: (result?.outBinds?.status ??
        ClientExistsStatusConstants.INTERNAL_ERROR) as ClientExistsStatusConstants,
    };
    switch (response.status) {
      case ClientExistsStatusConstants.SUCCESSFULL:
        return response;
      case ClientExistsStatusConstants.INTERNAL_ERROR:
        throw new ClientExistsInternalErrorException();
      case ClientExistsStatusConstants.THERE_IS_NO_DATA:
        throw new ClientExistsThereIsNoDataException();
      default:
        throw new ClientExistsInternalErrorException();
    }
  }
}
