import { Injectable } from '@nestjs/common';
import { DSLAuditLogsErrorException } from './dsl-audit-logs-error.exception';
import { DSLAuditLogsRequestDto } from './dsl-audit-logs-request.dto';
import { DSLAuditLogsStatusConstants } from './dsl-audit-logs-status.constants';
import { IDSLAuditLogsResponse } from './dsl-audit-logs-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';
import { BossHelper } from 'src/boss-helpers/boss.helper';

@Injectable()
export class DSLAuditLogsService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async log(dto: DSLAuditLogsRequestDto): Promise<IDSLAuditLogsResponse> {
    try {
      Wlog.instance.info({
        message: 'Invocando DSLAuditLogsService',
        data: BossHelper.getPhoneNumber(dto),
        clazz: DSLAuditLogsService.name,
        method: 'log',
      });
      await super.connect();
      const parameters = {
        i_areacode: OracleHelper.stringBindIn(dto.areaCode, 3),
        i_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 16),
        i_orderid: OracleHelper.stringBindIn(String(dto.orderId), 30),
        i_ipaddress: OracleHelper.stringBindIn(dto.ipAddress, 15),
        i_activationlogin: OracleHelper.stringBindIn(dto.activationLogin, 256),
        i_webpage: OracleHelper.dateBindIn(dto.webPage),
        i_code: OracleHelper.stringBindIn(dto.code, 10),
        i_description: OracleHelper.stringBindIn(dto.description, 532),
        i_comments: OracleHelper.numberBindIn(dto.comments),
        i_planname: OracleHelper.numberBindIn(dto.planName),
        o_status: OracleHelper.tableOfStringBindOut(),
        o_message: OracleHelper.tableOfStringBindOut(),
      };
      const result = await super.executeStoredProcedure(
        BossConstants.UTL_PACKAGE,
        BossConstants.DSL_AUDIT_LOGS,
        parameters,
      );
      const response: IDSLAuditLogsResponse = {
        message: OracleHelper.getFirstItem(result, 'o_message'),
        status: (result?.outBinds?.status ??
          DSLAuditLogsStatusConstants.ERROR) as DSLAuditLogsStatusConstants,
      };
      switch (response.status) {
        case DSLAuditLogsStatusConstants.SUCCESSFULL:
          return response;
        case DSLAuditLogsStatusConstants.ERROR:
          throw new DSLAuditLogsErrorException();
        default:
          throw new DSLAuditLogsErrorException();
      }
    } catch (error) {
      Wlog.instance.error({
        message: error?.message,
        data: BossHelper.getPhoneNumber(dto),
        clazz: DSLAuditLogsService.name,
        method: 'isIPAllowed',
        error: error,
        stack: error?.stack,
      });
      super.exceptionHandler(error, `${dto?.areaCode}-${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }
}
