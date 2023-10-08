import { getConnection, Connection } from 'oracledb';
import { CommonService } from './common.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';

export class OracleDatabaseService extends CommonService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super();
  }

  protected dbConnection: Connection;

  async connect(): Promise<void> {
    console.log();
    console.log('connecting to Oracle Database...');
    console.log('user', this.oracleConfigurationService.username);
    console.log('password', this.oracleConfigurationService.password);
    console.log('connectionString', this.oracleConfigurationService.uri);
    this.dbConnection = await getConnection({
      user: this.oracleConfigurationService.username,
      password: this.oracleConfigurationService.password,
      connectionString: this.oracleConfigurationService.uri,
    });
    console.log('Successfully connected to Oracle Database');
  }
}
