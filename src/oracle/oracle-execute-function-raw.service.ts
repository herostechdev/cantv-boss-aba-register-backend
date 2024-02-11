import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { Connection } from 'oracledb';
import { IOracleExecute } from './oracle-execute.interface';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';
import { InfrastructureConstants } from 'src/system/infrastructure/infrastructure.constants';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

export abstract class OracleExecuteFunctionRawService<DTO, RESPONSE>
  extends OracleDatabaseService
  implements IOracleExecute<DTO, RESPONSE>
{
  constructor(
    protected readonly packageName: string,
    protected readonly functionName: string,
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(dto: DTO, dbConnection?: Connection): Promise<RESPONSE> {
    const connection = await super.connect(dbConnection);
    try {
      const result = await this.executeFunction(
        connection,
        this.functionName,
        this.packageName,
        this.getParameters(dto),
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

  private async executeFunction(
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
}
