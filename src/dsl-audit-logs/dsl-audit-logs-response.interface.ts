import { DSLAuditLogsStatusConstants } from './dsl-audit-logs-status.constants';
import { IStatusResponse } from 'src/responses/status-response.interface';

export interface IDSLAuditLogsResponse
  extends IStatusResponse<DSLAuditLogsStatusConstants> {
  message: string;
}
