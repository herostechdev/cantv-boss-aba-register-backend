import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { BossConstants } from 'src/boss/boss.constants';
import { Error30092Exception } from 'src/exceptions/error-3009-2.exception';
import { GetPortIdRawService } from 'src/raw/database/stored-procedures/get-port-id/get-port-id-raw.service';
import { GetPortIdRequestDto } from 'src/raw/database/stored-procedures/get-port-id/get-port-id-request.dto';
import { GetPortIdStatusConstants } from 'src/raw/database/stored-procedures/get-port-id/get-port-id-status.constants';
import { GetPortIdException } from 'src/raw/database/stored-procedures/get-port-id/get-port-id.exception';
import { IGetPortIdResponse } from 'src/raw/database/stored-procedures/get-port-id/get-port-id-response.interface';

@Injectable()
export class AbaRegisterGetPortIdService extends AbaRegisterExecuteService<
  GetPortIdRequestDto,
  IGetPortIdResponse
> {
  constructor(protected readonly rawService: GetPortIdRawService) {
    super(
      AbaRegisterGetPortIdService.name,
      'Obtener el puerto a partir de la IP',
      rawService,
    );
  }

  protected processResponse(response: IGetPortIdResponse): IGetPortIdResponse {
    switch (response.status) {
      case GetPortIdStatusConstants.SUCCESSFULL:
        return response;
      case GetPortIdStatusConstants.EXECUTION_ERROR:
        throw new GetPortIdException();
      case GetPortIdStatusConstants.THERE_IS_NO_DATA:
        throw new Error30092Exception(BossConstants.GET_PORT_ID);
      default:
        throw new GetPortIdException();
    }
  }
}
