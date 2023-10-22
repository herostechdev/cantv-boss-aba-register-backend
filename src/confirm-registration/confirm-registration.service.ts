import { Injectable } from '@nestjs/common';
import { ConfirmRegistrationRequestDto } from './confirm-registration-request.dto';
import { ConfirmRegistrationData } from './confirm-registration-data';
import { DSLAuditLogsService } from 'src/dsl-audit-logs/dsl-audit-logs.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';

@Injectable()
export class ConfirmRegistrationService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly dslAuditLogsService: DSLAuditLogsService,
  ) {
    super(oracleConfigurationService);
  }

  async confirmRegistration(
    dto: ConfirmRegistrationRequestDto,
  ): Promise<ConfirmRegistrationData> {
    try {
      const data = new ConfirmRegistrationData();
      data.requestDto = dto;
      await super.connect();

      return data;
    } catch (error) {
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }
}
