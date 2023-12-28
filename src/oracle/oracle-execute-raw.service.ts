import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { IOracleRawExecute } from './oracle-raw-execute.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { Connection } from 'oracledb';

export class OracleExecuteRawService<DTO, RESPONSE>
  extends OracleDatabaseService
  implements IOracleRawExecute<DTO, RESPONSE>
{
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  execute(dto: DTO, dbConnection?: Connection): Promise<RESPONSE> {
    throw new Error('Method not implemented.');
  }

  getParameters(dto: DTO) {
    throw new Error('Method not implemented.');
  }

  getResponse(result: any): RESPONSE {
    throw new Error('Method not implemented.');
  }
}
