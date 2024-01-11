import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetAbaPlanForKenanRawService } from 'src/raw/functions/get-aba-plan-for-kenan/get-aba-plan-for-kenan-raw.service';
import { GetAbaPlanForKenanRequestDto } from 'src/raw/functions/get-aba-plan-for-kenan/get-aba-plan-for-kenan-request.dto';
import { IGetAbaPlanForKenanResponse } from 'src/raw/functions/get-aba-plan-for-kenan/get-aba-plan-for-kenan-response.interface';

@Injectable()
export class AbaRegisterGetAbaPlanForKenanService extends AbaRegisterExecuteService<
  GetAbaPlanForKenanRequestDto,
  IGetAbaPlanForKenanResponse
> {
  constructor(protected readonly rawService: GetAbaPlanForKenanRawService) {
    super(
      AbaRegisterGetAbaPlanForKenanService.name,
      'Obtener plan Aba para Kenan',
      rawService,
    );
  }

  protected processResponse(
    response: IGetAbaPlanForKenanResponse,
  ): IGetAbaPlanForKenanResponse {
    return response;
  }
}
