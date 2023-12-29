import { getConnection, Connection, BindParameter, BIND_OUT } from 'oracledb';
import { CommonService } from './common.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { Wlog } from '../winston-logger/winston-logger.service';
import { ValidationHelper } from '../helpers/validation.helper';

export abstract class OracleDatabaseService extends CommonService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super();
  }

  protected dbConnection: Connection;

  protected async connect(dbConnection?: Connection): Promise<void> {
    if (ValidationHelper.isDefined(dbConnection)) {
      this.dbConnection = dbConnection;
      return;
    }
    this.dbConnection = await getConnection(OracleConstants.POOL_ALIAS);
  }

  protected async closeConnection(
    closeConnection = true,
    additionalData?: any,
  ): Promise<void> {
    try {
      if (!this.dbConnection || !closeConnection) {
        return;
      }
      return this.dbConnection?.close();
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: additionalData?.phoneNumber,
        input: `closeConnection: ${closeConnection}`,
        clazz: OracleDatabaseService.name,
        method: 'closeConnection',
        error: error,
      });
    }
  }

  protected async executeStoredProcedure(
    packageName: string,
    storedProcedure: string,
    parameters?: any,
    additionalData?: any,
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
    const response = await this.dbConnection.execute(sql, parameters);

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
