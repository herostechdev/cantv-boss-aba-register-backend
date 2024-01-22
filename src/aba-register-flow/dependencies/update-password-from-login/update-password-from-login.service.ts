import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { IUpdatePasswordFromLoginResponse } from 'src/raw/stored-procedures/update-password-from-login/update-password-from-login-response.interface';
import { UpdatePasswordFromLoginException } from 'src/raw/stored-procedures/update-password-from-login/update-password-from-login.exception';
import { UpdatePasswordFromLoginRawService } from 'src/raw/stored-procedures/update-password-from-login/update-password-from-login-raw.service';
import { UpdatePasswordFromLoginRequestDto } from 'src/raw/stored-procedures/update-password-from-login/update-password-from-login-request.dto';
import { UpdatePasswordFromLoginStatusConstants } from 'src/raw/stored-procedures/update-password-from-login/update-password-from-login-status.constants';
import { UpdatePasswordFromLoginThereIsNoDataException } from 'src/raw/stored-procedures/update-password-from-login/update-password-from-login-there-is-no-data.exception';

@Injectable()
export class UpdatePasswordFromLoginService extends AbaRegisterExecuteService<
  UpdatePasswordFromLoginRequestDto,
  IUpdatePasswordFromLoginResponse
> {
  constructor(
    protected readonly rawService: UpdatePasswordFromLoginRawService,
  ) {
    super(
      UpdatePasswordFromLoginService.name,
      'Cambiar contraseña',
      rawService,
    );
  }

  protected processResponse(
    response: IUpdatePasswordFromLoginResponse,
  ): IUpdatePasswordFromLoginResponse {
    switch (response.status) {
      case UpdatePasswordFromLoginStatusConstants.SUCCESSFULL:
        return response;
      case UpdatePasswordFromLoginStatusConstants.ERROR:
        throw new UpdatePasswordFromLoginException();
      case UpdatePasswordFromLoginStatusConstants.THERE_IS_NO_DATA:
        throw new UpdatePasswordFromLoginThereIsNoDataException();
      default:
        throw new UpdatePasswordFromLoginException();
    }
  }
}
