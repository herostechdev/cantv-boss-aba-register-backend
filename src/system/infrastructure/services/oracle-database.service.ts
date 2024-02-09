import {
  getConnection,
  Connection,
  BindParameter,
  BIND_OUT,
  ExecuteOptions,
} from 'oracledb';
import { CommonService } from './common.service';
import { CloseDatabaseConnectionException } from '../exceptions/close-database-connection.exception';
import { GetDatabaseConnectionException } from '../exceptions/get-database-connection.exception';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { ValidationHelper } from '../helpers/validation.helper';
import { Wlog } from '../winston-logger/winston-logger.service';
import { InfrastructureConstants } from '../infrastructure.constants';

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
        this.logger.log('Existing database connection');
        return dbConnection;
      }
      this.logger.log('Database connection request');
      const connectionString = `${this.oracleConfigurationService.uri}:${this.oracleConfigurationService.port}/${this.oracleConfigurationService.sid}`;
      return await getConnection({
        user: this.oracleConfigurationService.username,
        password: this.oracleConfigurationService.password,
        connectionString: connectionString,
      });
    } catch (error) {
      this.logger.error(
        'An error occurred while obtaining a database connection',
        error?.stack,
      );
      throw new GetDatabaseConnectionException(error);
    }
  }

  protected async closeConnection(
    dbConnection?: Connection,
    closeConnection = true,
  ): Promise<void> {
    try {
      this.logger.log('Close database connection');
      if (ValidationHelper.isDefined(dbConnection) && closeConnection) {
        this.logger.log('Closing database connection');
        await dbConnection.close();
        this.logger.log('Database connection closed');
      }
    } catch (error) {
      this.logger.error(
        'An error occurred while closing a database connection',
        error?.stack,
      );
      throw new CloseDatabaseConnectionException(error);
    }
  }

  protected async executeStoredProcedure(
    dbConnection: Connection,
    packageName: string,
    storedProcedure: string,
    parameters?: any,
    additionalData?: any,
    autoCommit = false,
  ): Promise<any> {
    this.logger.log(InfrastructureConstants.SEPARATOR);
    this.logger.log(
      `Running the stored procedure ${this.getPackage(
        packageName,
      )}${storedProcedure}`,
    );
    this.logger.log(InfrastructureConstants.SIMPLE_SEPARATOR);
    this.logger.log('Parameters');
    this.logger.log(parameters);
    Wlog.instance.info({
      phoneNumber: additionalData?.phoneNumber,
      message: `Ejecutando el SP: ${this.getPackage(
        packageName,
      )}${storedProcedure}`,
      input: JSON.stringify(parameters),
      clazz: OracleDatabaseService.name,
      method: 'executeStoredProcedure',
    });
    const sql = this.getStoredProcedureStatement(
      packageName,
      storedProcedure,
      parameters,
    );
    Wlog.instance.info({
      phoneNumber: additionalData?.phoneNumber,
      message: `Sentencia Sql: ${sql}`,
      input: JSON.stringify(parameters),
      clazz: OracleDatabaseService.name,
      method: 'executeStoredProcedure',
    });
    const options: ExecuteOptions = {
      autoCommit: autoCommit,
    };
    this.logger.log('Options');
    this.logger.log(options);

    const response = await dbConnection.execute(sql, parameters, options);

    this.logger.log('Response');
    this.logger.log(JSON.stringify(response));

    Wlog.instance.info({
      phoneNumber: additionalData?.phoneNumber,
      message: `Respuesta del SP: ${this.getPackage(
        packageName,
      )}${storedProcedure}`,
      response: JSON.stringify(response),
      clazz: OracleDatabaseService.name,
      method: 'executeStoredProcedure',
    });
    return response;
  }

  private getStoredProcedureStatement(
    packageName: string,
    storedProcedure: string,
    parameters?: any,
  ): string {
    packageName = this.getPackage(packageName);
    parameters = this.getParameterNames(parameters);
    return `BEGIN ${packageName}${storedProcedure}(${parameters}); END;`;
  }

  protected async executeFunction(
    dbConnection: Connection,
    functionName: string,
    packageName?: string,
    parameters?: any,
    additionalData?: any,
  ): Promise<any> {
    this.logger.log(InfrastructureConstants.SEPARATOR);
    this.logger.log(
      `Running the function ${this.getPackage(packageName)}${functionName}`,
    );
    this.logger.log(InfrastructureConstants.SIMPLE_SEPARATOR);

    this.logger.log('Parameters');
    this.logger.log(parameters);

    Wlog.instance.info({
      phoneNumber: additionalData?.phoneNumber,
      message: `Ejecutando la función: ${this.getPackage(
        packageName,
      )}${functionName}`,
      input: JSON.stringify(parameters),
      clazz: OracleDatabaseService.name,
      method: 'executeFunction',
    });
    const sql = this.getFunctionStatement(
      functionName,
      packageName,
      parameters,
    );

    Wlog.instance.info({
      phoneNumber: additionalData?.phoneNumber,
      message: `Sentencia Sql: ${sql}`,
      input: JSON.stringify(parameters),
      clazz: OracleDatabaseService.name,
      method: 'executeFunction',
    });
    const options = {
      autoCommit: true,
    };
    this.logger.log('Options');
    this.logger.log(options);

    const response = await dbConnection.execute(sql, parameters, options);

    this.logger.log('Response');
    this.logger.log(JSON.stringify(response));

    Wlog.instance.info({
      phoneNumber: additionalData?.phoneNumber,
      message: `Respuesta la función: ${this.getPackage(
        packageName,
      )}${functionName}`,
      response: JSON.stringify(response),
      clazz: OracleDatabaseService.name,
      method: 'executeFunction',
    });
    return response;
  }

  private getFunctionStatement(
    functionName: string,
    packageName?: string,
    parameters?: any,
  ): string {
    packageName = this.getPackage(packageName);
    parameters = this.getParameterNames(parameters, true);
    return `BEGIN :result := ${packageName}${functionName}(${parameters}); END;`;
  }

  private getPackage(packageName?: string): string {
    return packageName ? `${packageName}.` : '';
  }

  private getParameterNames(
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
