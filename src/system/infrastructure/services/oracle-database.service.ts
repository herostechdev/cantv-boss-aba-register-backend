import {
  getConnection,
  Connection,
  BindParameter,
  BIND_OUT,
  ExecuteOptions,
} from 'oracledb';
import { CommonService } from './common.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { Wlog } from '../winston-logger/winston-logger.service';
import { ValidationHelper } from '../helpers/validation.helper';
import { HttpException } from '@nestjs/common';

export abstract class OracleDatabaseService extends CommonService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super();
  }

  protected dbConnection: Connection;

  protected async connect2(dbConnection?: Connection): Promise<Connection> {
    try {
      console.log();
      console.log('OracleDatabaseService.closeConnection2');
      if (ValidationHelper.isDefined(dbConnection)) {
        console.log('existing connection');
        return dbConnection;
      }
      console.log('creating connection...');
      const connectionString = `${this.oracleConfigurationService.uri}:${this.oracleConfigurationService.port}/${this.oracleConfigurationService.sid}`;
      return getConnection({
        user: this.oracleConfigurationService.username,
        password: this.oracleConfigurationService.password,
        connectionString: connectionString,
      });
    } catch (error) {
      console.log();
      console.log('OracleDatabaseService.connect2 >> ERROR');
      console.log('error message', error?.message);
      console.log();
      throw new HttpException(
        'Error al obtener la conexión de base de datos',
        500,
      );
    }
  }

  protected async closeConnection2(
    dbConnection?: Connection,
    closeConnection = true,
  ): Promise<void> {
    try {
      console.log();
      console.log('OracleDatabaseService.closeConnection2');
      if (ValidationHelper.isDefined(dbConnection) && closeConnection) {
        console.log('closing connection...');
        await dbConnection.close();
        console.log('connection closed');
      }
    } catch (error) {
      console.log();
      console.log('OracleDatabaseService.closeConnection2 >> ERROR');
      console.log('error message', error?.message);
      console.log();
      throw new HttpException(
        'Error al cerrar la conexión de base de datos',
        500,
      );
    }
  }

  protected async connect(dbConnection?: Connection): Promise<void> {
    if (ValidationHelper.isDefined(dbConnection)) {
      this.dbConnection = dbConnection;
      return;
    }
    if (this.oracleConfigurationService.usePoolConnections) {
      this.dbConnection = await getConnection(OracleConstants.POOL_ALIAS);
    } else {
      const connectionString = `${this.oracleConfigurationService.uri}:${this.oracleConfigurationService.port}/${this.oracleConfigurationService.sid}`;
      this.dbConnection = await getConnection({
        user: this.oracleConfigurationService.username,
        password: this.oracleConfigurationService.password,
        connectionString: connectionString,
      });
    }
  }

  protected async closeConnection(
    closeConnection = true,
    additionalData?: any,
  ): Promise<void> {
    try {
      console.log('START   closeConnection');
      console.log(
        'isDefined(this.dbConnection)',
        ValidationHelper.isDefined(this.dbConnection),
      );
      console.log('closeConnection', closeConnection);

      if (!this.dbConnection || !closeConnection) {
        console.log('DO NOT CLOSE CONNECTION');
        return;
      }

      console.log('DO CLOSE CONNECTION');

      await this.dbConnection?.close();
      // await this.dbConnection?.release();

      console.log('CONNECTION CLOSED');
    } catch (error) {
      console.log('ERROR');
      console.log(JSON.stringify(error));

      Wlog.instance.error({
        phoneNumber: additionalData?.phoneNumber,
        input: `closeConnection: ${closeConnection}`,
        clazz: OracleDatabaseService.name,
        method: 'closeConnection',
        error: error,
      });

      console.log('END   closeConnection');
      console.log();
    }
  }

  protected async executeStoredProcedure(
    packageName: string,
    storedProcedure: string,
    parameters?: any,
    additionalData?: any,
    autoCommit = false,
    dbConnection?: Connection,
  ): Promise<any> {
    console.log();
    console.log('============================================================');
    console.log('executeStoredProcedure');
    console.log(
      `Ejecutando el SP: ${this.getPackage(packageName)}${storedProcedure}`,
    );
    console.log();
    console.log('parameters');
    console.log(parameters);

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

    console.log();
    console.log('sql');
    console.log(JSON.stringify(sql));

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

    console.log();
    console.log('options', options);

    // const response = await this.dbConnection.execute(sql, parameters, options);
    const conn = dbConnection ?? this.dbConnection;
    const response = await conn.execute(sql, parameters, options);

    console.log();
    console.log('response');
    console.log(JSON.stringify(response));

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
    functionName: string,
    packageName?: string,
    parameters?: any,
    additionalData?: any,
  ): Promise<any> {
    console.log();
    console.log('============================================================');
    console.log('executeFunction');
    console.log(
      `Ejecutando la función: ${this.getPackage(packageName)}${functionName}`,
    );
    console.log();
    console.log('parameters');
    console.log(parameters);

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

    console.log();
    console.log('sql');
    console.log(JSON.stringify(sql));

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
    const response = await this.dbConnection.execute(sql, parameters, options);

    console.log();
    console.log('response');
    console.log(JSON.stringify(response));

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

  async setTimestampFormat(): Promise<void> {
    let sql =
      "alter session set nls_timestamp_format = 'YYYY-MM-DD HH24:MI:SS.FF'";
    await this.dbConnection.execute(sql);
    sql =
      "alter session set nls_timestamp_tz_format = 'YYYY-MM-DD HH24:MI:SS.FF'";
    await this.dbConnection.execute(sql);
  }
}
