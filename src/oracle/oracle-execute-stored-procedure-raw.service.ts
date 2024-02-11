import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { Connection, ExecuteOptions } from 'oracledb';
import { IOracleExecute } from './oracle-execute.interface';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';
import { InfrastructureConstants } from 'src/system/infrastructure/infrastructure.constants';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

export abstract class OracleExecuteStoredProcedureRawService<DTO, RESPONSE>
  extends OracleDatabaseService
  implements IOracleExecute<DTO, RESPONSE>
{
  constructor(
    protected readonly packageName: string,
    protected readonly storedProcedureName: string,
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: DTO,
    dbConnection?: Connection,
    autoCommit = false,
  ): Promise<RESPONSE> {
    const connection = await super.connect(dbConnection);
    try {
      const result = await this.executeStoredProcedure(
        connection,
        this.packageName,
        this.storedProcedureName,
        this.getParameters(dto),
        null,
        autoCommit,
      );
      return this.getResponse(result);
    } catch (error) {
      super.exceptionHandler(error, dto);
    } finally {
      await super.closeConnection(
        connection,
        !ValidationHelper.isDefined(dbConnection),
      );
    }
  }

  protected abstract getParameters(dto: DTO): any;

  protected abstract getResponse(result: any): RESPONSE;

  private async executeStoredProcedure(
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

    this.logger.log('executeStoredProcedure  response');
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
}
