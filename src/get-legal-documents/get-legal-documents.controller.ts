import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { GetLegalDocumentsRequestDto } from './get-legal-documents-request.dto';
import { GetLegalDocumentsService } from './get-legal-documents.service';
import { HttpCodeConstants } from 'src/system/infrastructure/helpers/http-code-constants';
import { HttpExceptionFilter } from 'src/system/infrastructure/exceptions/exception-filters/http-exception.filter';
import { IGetLegalDocuments } from './get-legal-documents-response.interface';

@Controller({
  path: 'getLegalDocuments',
  version: '1',
})
export class GetLegalDocumentsController {
  constructor(private readonly service: GetLegalDocumentsService) {}

  @Post()
  @HttpCode(HttpCodeConstants.HTTP_200_OK)
  @UseFilters(new HttpExceptionFilter())
  ConfirmRegistration(
    @Body() dto: GetLegalDocumentsRequestDto,
  ): Promise<IGetLegalDocuments> {
    return this.service.get(dto);
  }
}
