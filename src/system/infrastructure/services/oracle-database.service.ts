import { getConnection, Connection } from 'oracledb';
import { CommonService } from './common.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';

export abstract class OracleDatabaseService extends CommonService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super();
  }

  protected dbConnection: Connection;

  protected async connect(): Promise<void> {
    console.log();
    console.log('connecting to Oracle Database...');
    // console.log('user', this.oracleConfigurationService.username);
    // console.log('password', this.oracleConfigurationService.password);
    // console.log('connectionString', this.oracleConfigurationService.uri);
    // console.log('port', this.oracleConfigurationService.port);
    // console.log('sid', this.oracleConfigurationService.sid);
    // console.log('oracleHome', this.oracleConfigurationService.oracleHome);
    // const connectionString = `${this.oracleConfigurationService.uri}:${this.oracleConfigurationService.port}/${this.oracleConfigurationService.sid}`;
    // console.log('connectionString', connectionString);
    // this.dbConnection = await getConnection({
    //   user: this.oracleConfigurationService.username,
    //   password: this.oracleConfigurationService.password,
    //   connectionString: connectionString,
    // });
    this.dbConnection = await getConnection();
    console.log('Successfully connected to Oracle Database');
  }

  protected async closeConnection(): Promise<void> {
    return this.dbConnection?.close();
  }

  protected executeStoredProcedure(
    dbPackage: string,
    storedProcedure: string,
    parameters?: any[],
  ): Promise<any> {
    const query = `EXECUTE ${dbPackage}.${storedProcedure}`;
    return this.dbConnection.execute(query, parameters);
  }
}
