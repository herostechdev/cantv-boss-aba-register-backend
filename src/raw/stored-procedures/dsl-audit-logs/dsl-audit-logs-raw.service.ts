import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { DSLAuditLogsErrorException } from './dsl-audit-logs-error.exception';
import { DSLAuditLogsRequestDto } from './dsl-audit-logs-request.dto';
import { DSLAuditLogsStatusConstants } from './dsl-audit-logs-status.constants';
import { IDSLAuditLogsResponse } from './dsl-audit-logs-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class DSLAuditLogsRawService extends OracleExecuteStoredProcedureRawService<
  DSLAuditLogsRequestDto,
  IDSLAuditLogsResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.UTL_PACKAGE,
      BossConstants.INSERT_DSL_AUDIT_LOGS,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: DSLAuditLogsRequestDto): any {
    return {
      i_areacode: OracleHelper.stringBindIn(dto.areaCode, 3),
      i_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 16),
      i_orderid: OracleHelper.stringBindIn(String(dto.orderId), 30),
      i_ipaddress: OracleHelper.stringBindIn(dto.ipAddress, 15),
      i_activationlogin: OracleHelper.stringBindIn(dto.activationLogin, 256),
      i_webpage: OracleHelper.stringBindIn(
        dto.webPage ?? BossConstants.ABA_REGISTER,
      ),
      i_code: OracleHelper.stringBindIn(
        dto.code ?? BossConstants.OK_RESPONSE,
        10,
      ),
      i_description: OracleHelper.stringBindIn(
        dto.description ?? BossConstants.ABA_REGISTER,
        532,
      ),
      i_comments: OracleHelper.stringBindIn(dto.comments),
      i_planname: OracleHelper.stringBindIn(dto.planName),

      o_status: OracleHelper.tableOfNumberBindOut(),
      o_message: OracleHelper.tableOfStringBindOut(),
    };
  }

  protected getResponse(result: any): IDSLAuditLogsResponse {
    const response = {
      message: OracleHelper.getFirstItem(result, 'o_message'),
      status: (OracleHelper.getFirstItem(result, 'o_status') ??
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
  }
}
