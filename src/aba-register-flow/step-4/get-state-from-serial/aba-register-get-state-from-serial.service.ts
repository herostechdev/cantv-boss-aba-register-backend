import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetStateFromSerialRawService } from 'src/raw/database/stored-procedures/get-state-from-serial/get-state-from-serial-raw.service';
import { GetStateFromSerialRequestDto } from 'src/raw/database/stored-procedures/get-state-from-serial/get-state-from-serial-request.dto';
import { GetStateFromSerialStatusConstants } from 'src/raw/database/stored-procedures/get-state-from-serial/get-state-from-serial-status.constants';
import { GetStateFromSerialException } from 'src/raw/database/stored-procedures/get-state-from-serial/get-state-from-serial.exception';
import { IGetStateFromSerialResponse } from 'src/raw/database/stored-procedures/get-state-from-serial/get-state-from-serial-response.interface';

@Injectable()
export class AbaRegisterGetStateFromSerialService extends AbaRegisterExecuteService<
  GetStateFromSerialRequestDto,
  IGetStateFromSerialResponse
> {
  constructor(protected readonly rawService: GetStateFromSerialRawService) {
    super(
      AbaRegisterGetStateFromSerialService.name,
      'Obteniendo los estados asociados al área telefónica',
      rawService,
    );
  }

  protected processResponse(
    response: IGetStateFromSerialResponse,
  ): IGetStateFromSerialResponse {
    switch (response.status) {
      case GetStateFromSerialStatusConstants.SUCCESSFULL:
        return response;
      case GetStateFromSerialStatusConstants.ERROR:
        throw new GetStateFromSerialException();
      case GetStateFromSerialStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetStateFromSerialException();
    }
  }
}
