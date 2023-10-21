import { Injectable } from '@nestjs/common';
import { DSLAuditLogsRequestDto } from './dsl-audit-logs-request.dto';
import { IDSLAuditLogsResponse } from './dsl-audit-logs-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class DSLAuditLogsService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async log(dto: DSLAuditLogsRequestDto): Promise<IDSLAuditLogsResponse> {
    try {
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
        o_status: OracleHelper.tableOfNumberBindOut(2),
        o_message: OracleHelper.tableOfStringBindOut(30),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.UTL_PACKAGE,
        OracleConstants.DSL_AUDIT_LOGS,
        parameters,
      );
      return {
        status: OracleHelper.getFirstItem(result, 'o_status'),
        message: OracleHelper.getFirstItem(result, 'o_message'),
      };
    } catch (error) {
      super.exceptionHandler(error, `${dto?.areaCode}-${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }
}
