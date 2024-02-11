import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/database/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { WLogHelper } from 'src/system/infrastructure/winston-logger/wlog.helper';

export abstract class BossFlowService<
  DTO extends IPhoneNumber,
  RESPONSE,
> extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  protected dto: DTO;

  protected response: RESPONSE;

  protected readonly wlog = new WLogHelper();
}
