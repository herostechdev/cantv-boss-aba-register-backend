import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetValidVPIRawService } from 'src/raw/database/functions/get-valid-vpi/get-valid-vpi-raw.service';
import { GetValidVPIRequestDto } from 'src/raw/database/functions/get-valid-vpi/get-valid-vpi-request.dto';
import { IGetValidVPIResponse } from 'src/raw/database/functions/get-valid-vpi/get-valid-vpi-response.interface';

@Injectable()
export class AbaRegisterGetValidVPIService extends AbaRegisterExecuteService<
  GetValidVPIRequestDto,
  IGetValidVPIResponse
> {
  constructor(protected readonly rawService: GetValidVPIRawService) {
    super(
      AbaRegisterGetValidVPIService.name,
      'Obtener un VPI válido',
      rawService,
    );
  }

  protected processResponse(
    response: IGetValidVPIResponse,
  ): IGetValidVPIResponse {
    return response;
  }
}
