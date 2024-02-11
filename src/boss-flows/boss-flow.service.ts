import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { IAbaRegisterWinstonErrorLogInputData } from 'src/system/infrastructure/winston-logger/aba-register-winston-error-log-input-data.interface';
import { IAbaRegisterWinstonLogInputData } from 'src/system/infrastructure/winston-logger/aba-register-winston-log-input-data.interface';
import { IPhoneNumber } from 'src/boss/dtos/phone-number.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { WinstonLogTypeConstants } from 'src/system/infrastructure/winston-logger/winston-log-type.constants';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';
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
