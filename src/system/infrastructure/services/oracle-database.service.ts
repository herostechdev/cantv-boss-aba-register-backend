import { getConnection, Connection } from 'oracledb';
import { CommonService } from './common.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle.constants';

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
    dbPackage: string,
    storedProcedure: string,
    parameters?: any,
  ): Promise<any> {
    // console.log();
    // console.log('executeStoredProcedure');
    // console.log('    dbPackage       >>', dbPackage);
    // console.log('    storedProcedure >>', storedProcedure);
    // console.log('    parameters      >>');
    // console.log(parameters);
    // console.log();
    const sql = this.getStoredProcedureStatement(
      dbPackage,
      storedProcedure,
      parameters,
    );
    // console.log();
    // console.log('    sql             >>', sql);
    // console.log();
    return await this.dbConnection.execute(sql, parameters);
  }

  protected async executeStoredProcedureByPosition(
    dbPackage: string,
    storedProcedure: string,
    parameters: any,
  ): Promise<any> {
    const sql = this.getStoredProcedureStatement(
      dbPackage,
      storedProcedure,
      parameters,
    );
    const data = Object.keys(parameters).map((key) => parameters[key]);
    return await this.dbConnection.execute(sql, data);
  }

  private getStoredProcedureStatement(
    dbPackage: string,
    storedProcedure: string,
    parameters?: any,
  ): string {
    return `BEGIN ${dbPackage}.${storedProcedure}(${this.getParameterNames(
      parameters,
    )}); END;`;
  }

  private getParameterNames(parameters?: any): string {
    if (!parameters) return '';
    return `:${Object.keys(parameters).join(', :')}`;
  }
}
