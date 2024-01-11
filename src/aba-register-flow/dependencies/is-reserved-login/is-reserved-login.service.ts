import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { IIsReservedLoginResponse } from 'src/raw/stored-procedures/is-reserved-login/is-reserved-login-response.interface';
import { IsReservedLoginException } from 'src/raw/stored-procedures/is-reserved-login/is-reserved-login.exception';
import { IsReservedLoginRawService } from 'src/raw/stored-procedures/is-reserved-login/is-reserved-login-raw.service';
import { IsReservedLoginRequestDto } from 'src/raw/stored-procedures/is-reserved-login/is-reserved-login-request.dto';
import { IsReservedLoginStatusConstants } from 'src/raw/stored-procedures/is-reserved-login/is-reserved-login-status.constants';
import { IsReservedLoginThereIsNoDataException } from 'src/raw/stored-procedures/is-reserved-login/is-reserved-login-there-is-no-data.exception';

@Injectable()
export class AbaRegisterIsReservedLoginService extends AbaRegisterExecuteService<
  IsReservedLoginRequestDto,
  IIsReservedLoginResponse
> {
  constructor(protected readonly rawService: IsReservedLoginRawService) {
    super(
      AbaRegisterIsReservedLoginService.name,
      'Validando si el usuario (login) está reservado',
      rawService,
    );
  }

  protected processResponse(
    response: IIsReservedLoginResponse,
  ): IIsReservedLoginResponse {
    switch (response.status) {
      case IsReservedLoginStatusConstants.SUCCESSFULL:
        return response;
      case IsReservedLoginStatusConstants.ERROR:
        throw new IsReservedLoginException();
      case IsReservedLoginStatusConstants.THERE_IS_NO_DATA:
        throw new IsReservedLoginThereIsNoDataException();
      default:
        throw new IsReservedLoginException();
    }
  }
}
