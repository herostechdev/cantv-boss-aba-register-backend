import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

export abstract class OracleExecuteStoredProcedureRawService<
  DTO,
  RESPONSE,
> extends OracleDatabaseService {
  constructor(
    protected readonly packageName: string,
    protected readonly storedProcedureName: string,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(dto: DTO, dbConnection?: Connection): Promise<RESPONSE> {
    try {
      await super.connect(dbConnection);
      const result = await super.executeStoredProcedure(
        this.packageName,
        this.storedProcedureName,
        this.getParameters(dto),
      );
      return this.getResponse(result);
    } catch (error) {
      if (
        ValidationHelper.isDefined(dto) &&
        dto.hasOwnProperty('areaCode') &&
        ValidationHelper.isDefined(dto['areaCode']) &&
        dto.hasOwnProperty('phoneNumber') &&
        ValidationHelper.isDefined(dto['phoneNumber'])
      ) {
        await this.updateDslAbaRegistersService.errorUpdate({
          areaCode: dto['areaCode'],
          phoneNumber: dto['phoneNumber'],
          registerStatus: BossConstants.NOT_PROCESSED,
        });
      }
      super.exceptionHandler(error, dto);
    } finally {
      await super.closeConnection(ValidationHelper.isDefined(dbConnection));
    }
  }

  protected abstract getParameters(dto: DTO): any;

  protected abstract getResponse(result: any): RESPONSE;
}
