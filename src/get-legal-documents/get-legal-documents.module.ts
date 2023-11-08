import { Module } from '@nestjs/common';
import { GetLegalDocumentsController } from './get-legal-documents.controller';
import { GetLegalDocumentsService } from './get-legal-documents.service';

@Module({
  imports: [],
  controllers: [GetLegalDocumentsController],
  providers: [GetLegalDocumentsService],
  exports: [GetLegalDocumentsService],
})
export class GetLegalDocumentsModule {}
