import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { IsOccupiedPortRawService } from 'src/raw/database/stored-procedures/Is-occupied-port/Is-occupied-port-raw.service';
import { IsOccupiedPortRequestDto } from 'src/raw/database/stored-procedures/Is-occupied-port/Is-occupied-port-request.dto';
import { IIsOccupiedPortResponse } from 'src/raw/database/stored-procedures/Is-occupied-port/is-occupied-port-response.interface';
import { IsOccupiedPortStatusConstants } from 'src/raw/database/stored-procedures/Is-occupied-port/is-occupied-port-status.constants';
import { IsOccupiedPortTherIsNoDataException } from 'src/raw/database/stored-procedures/Is-occupied-port/is-occupied-port-there-is-no-data.exception';
import { IsOccupiedPortException } from 'src/raw/database/stored-procedures/Is-occupied-port/is-occupied-port.exception';

@Injectable()
export class AbaRegisterIsOccupiedPortService extends AbaRegisterExecuteService<
  IsOccupiedPortRequestDto,
  IIsOccupiedPortResponse
> {
  constructor(protected readonly rawService: IsOccupiedPortRawService) {
    super(
      AbaRegisterIsOccupiedPortService.name,
      'Obtener información que indique si el puerto está ocupado',
      rawService,
    );
  }

  protected processResponse(
    response: IIsOccupiedPortResponse,
  ): IIsOccupiedPortResponse {
    switch (response.status) {
      case IsOccupiedPortStatusConstants.SUCCESSFULL:
        return response;
      case IsOccupiedPortStatusConstants.ERROR:
        throw new IsOccupiedPortException();
      case IsOccupiedPortStatusConstants.THERE_IS_NO_DATA:
        throw new IsOccupiedPortTherIsNoDataException();
      default:
        throw new IsOccupiedPortException();
    }
  }
}
