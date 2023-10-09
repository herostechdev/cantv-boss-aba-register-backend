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
    this.dbConnection = await getConnection(OracleConstants.POOL_ALIAS);
    console.log('Successfully connected to Oracle Database');
  }

  protected async closeConnection(): Promise<void> {
    return this.dbConnection?.close();
  }

  protected async executeStoredProcedure(
    dbPackage: string,
    storedProcedure: string,
    parameters?: any,
  ): Promise<any> {
    // const result = await connection.execute(
    //   "BEGIN get_permiso(:descr, :cursor_); END;",
    //   {
    //     descr: 'macro2', // parámetro de entrada
    //     cursor_: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } // parámetro de salida
    //   }
    // );

    // const bindVars = {
    //   p_parametro1: valor1,
    //   p_parametro2: valor2,
    //   // Agrega más parámetros si es necesario
    // };
    // const result = await connection.execute(
    //   'BEGIN TuProcedimiento(:p_parametro1, :p_parametro2); END;',
    //   bindVars
    // );
    // console.log('Resultado:', result);
    console.log();
    console.log('executeStoredProcedure');
    console.log('    dbPackage       >>', dbPackage);
    console.log('    storedProcedure >>', storedProcedure);
    console.log('    parameters      >>');
    console.log(parameters);
    const sql = this.getStoredProcedureExecuteStatement(
      dbPackage,
      storedProcedure,
      parameters,
    );
    console.log();
    console.log('    sql             >>');
    console.log(sql);
    return await this.dbConnection.execute(sql, parameters);
  }

  private getStoredProcedureExecuteStatement(
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
