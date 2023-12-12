import {
  getConnection,
  Connection,
  BindParameter,
  NUMBER,
  DB_TYPE_BOOLEAN,
} from 'oracledb';
import { DateTime } from 'luxon';
import { CommonService } from './common.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';

export abstract class OracleDatabaseService extends CommonService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super();
  }

  protected dbConnection: Connection;

  protected async connect(): Promise<void> {
    this.dbConnection = await getConnection(OracleConstants.POOL_ALIAS);
  }

  protected async closeConnection(): Promise<void> {
    return this.dbConnection?.close();
  }

  protected async executeStoredProcedure(
    packageName: string,
    storedProcedure: string,
    parameters?: any,
  ): Promise<any> {
    console.log();
    console.log('executeStoredProcedure');
    console.log();
    console.log('packageName', packageName, 'storedProcedure', storedProcedure);
    console.log('parameters');
    console.log(JSON.stringify(parameters));
    console.log();
    const sql = this.getStoredProcedureStatement(
      packageName,
      storedProcedure,
      parameters,
    );
    // return await this.dbConnection.execute(sql, parameters);
    const response = await this.dbConnection.execute(sql, parameters);
    console.log();
    console.log('response');
    console.log(JSON.stringify(response));
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
  ): Promise<any> {
    console.log();
    console.log('executeFunction');
    const sql = this.getFunctionStatement(
      functionName,
      packageName,
      parameters,
    );
    console.log('sql');
    console.log(sql);
    return await this.dbConnection.execute(sql, parameters);
  }

  private getFunctionStatement(
    functionName: string,
    packageName?: string,
    parameters?: any,
  ): string {
    packageName = this.getPackage(packageName);
    parameters = this.getParameterValues(parameters);
    // return `SELECT ${packageName}${functionName}(${parameters}) FROM DUAL;`;
    return `BEGIN :result := ${packageName}${functionName}(${parameters}); END;`;
  }

  private getPackage(packageName?: string): string {
    return packageName ? `${packageName}.` : '';
  }

  private getParameterNames(parameters?: any): string {
    if (!parameters) return '';
    return `:${Object.keys(parameters).join(', :')}`;
  }

  private getParameterValues(parameters?: any): string {
    if (!parameters) return '';
    const keys = Object.keys(parameters);
    return keys
      .map((key) => {
        const bindParameter = parameters[key] as BindParameter;
        console.log();
        console.log('bindParameter');
        console.log(bindParameter);
        if (
          bindParameter.type === NUMBER ||
          bindParameter.type === DB_TYPE_BOOLEAN
        ) {
          return bindParameter.val;
        }
        return `'${bindParameter.val}'`;
      })
      .join(', ')
      .trim();
  }
}
