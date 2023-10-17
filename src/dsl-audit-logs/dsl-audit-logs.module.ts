import { Global, Module } from '@nestjs/common';
import { DSLAuditLogsController } from './dsl-audit-logs.controller';
import { DSLAuditLogsService } from './dsl-audit-logs.service';

@Global()
@Module({
  imports: [],
  controllers: [DSLAuditLogsController],
  providers: [DSLAuditLogsService],
  exports: [DSLAuditLogsService],
})
export class DSLAuditLogsModule {}
