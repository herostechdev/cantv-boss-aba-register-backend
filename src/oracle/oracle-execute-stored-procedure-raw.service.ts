import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { Connection } from 'oracledb';
import { IOracleExecute } from './oracle-execute.interface';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

export abstract class OracleExecuteStoredProcedureRawService<DTO, RESPONSE>
  extends OracleDatabaseService
  implements IOracleExecute<DTO, RESPONSE>
{
  constructor(
    protected readonly packageName: string,
    protected readonly storedProcedureName: string,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: DTO,
    dbConnection?: Connection,
    autoCommit = false,
  ): Promise<RESPONSE> {
    const conn = await super.connect2(dbConnection);
    try {
      // await super.connect(dbConnection);

      const result = await super.executeStoredProcedure(
        this.packageName,
        this.storedProcedureName,
        this.getParameters(dto),
        null,
        autoCommit,
        conn,
      );
      return this.getResponse(result);
    } catch (error) {
      super.exceptionHandler(error, dto);
    } finally {
      super.closeConnection2(conn, !ValidationHelper.isDefined(dbConnection));
      // await super.closeConnection(!ValidationHelper.isDefined(dbConnection));
    }
  }

  protected abstract getParameters(dto: DTO): any;

  protected abstract getResponse(result: any): RESPONSE;
}
