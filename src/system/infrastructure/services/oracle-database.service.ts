import { getConnection, Connection, BindParameter, BIND_OUT } from 'oracledb';
import { CommonService } from './common.service';
import { CloseDatabaseConnectionException } from '../exceptions/close-database-connection.exception';
import { GetDatabaseConnectionException } from '../exceptions/get-database-connection.exception';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { ValidationHelper } from '../helpers/validation.helper';

export abstract class OracleDatabaseService extends CommonService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super();
  }

  protected async connect(dbConnection?: Connection): Promise<Connection> {
    try {
      this.logger.log('Connect to database');
      if (ValidationHelper.isDefined(dbConnection)) {
        this.logger.log('Return existing database connection');
        return dbConnection;
      }
      this.logger.log('Get database connection string');
      const connectionString = `${this.oracleConfigurationService.uri}:${this.oracleConfigurationService.port}/${this.oracleConfigurationService.sid}`;
      this.logger.log('Request new database connection');
      const connection = await getConnection({
        user: this.oracleConfigurationService.username,
        password: this.oracleConfigurationService.password,
        connectionString: connectionString,
      });
      this.logger.log('New database connection acquired');
      return connection;
    } catch (error) {
      this.logger.error(
        'An error occurred while obtaining a database connection',
        error?.stack,
      );
      throw new GetDatabaseConnectionException(error);
    }
  }

  protected async closeConnection(
    dbConnection: Connection,
    closeConnection = true,
  ): Promise<void> {
    try {
      this.logger.log('Close database connection');
      if (ValidationHelper.isDefined(dbConnection) && closeConnection) {
        this.logger.log('Closing database connection');
        await dbConnection.close();
        this.logger.log('Database connection closed');
        return;
      }
      this.logger.log('The connection to the database was not closed');
    } catch (error) {
      this.logger.error(
        'An error occurred while closing a database connection',
        error?.stack,
      );
      throw new CloseDatabaseConnectionException(error);
    }
  }

  protected getPackage(packageName?: string): string {
    return packageName ? `${packageName}.` : '';
  }

  protected getParameterNames(
    parameters?: any,
    excludeOutParameters = false,
  ): string {
    if (!parameters) return '';
    const filteredParameters = Object.keys(parameters).filter((key) => {
      const parameter: BindParameter = parameters[key];
      if (excludeOutParameters === true && parameter.dir === BIND_OUT) {
        return false;
      }
      return true;
    });
    return `:${filteredParameters.join(', :')}`;
  }

  async setTimestampFormat(dbConnection: Connection): Promise<void> {
    let sql =
      "alter session set nls_timestamp_format = 'YYYY-MM-DD HH24:MI:SS.FF'";
    await dbConnection.execute(sql);
    sql =
      "alter session set nls_timestamp_tz_format = 'YYYY-MM-DD HH24:MI:SS.FF'";
    await dbConnection.execute(sql);
  }
}
