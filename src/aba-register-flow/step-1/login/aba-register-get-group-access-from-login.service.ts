import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetGroupAccessFromLoginException } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login.exception';
import { GetGroupAccessFromLoginNotFoundException } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-not-found.exception';
import { GetGroupAccessFromLoginRawService } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-raw.service';
import { GetGroupAccessFromLoginRequestDto } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-request.dto';
import { GetGroupAccessFromLoginStatusConstants } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-status.constants';
import { GetGroupAccessFromLoginThereIsNoDataException } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-there-is-no-data.exception';
import { IGetGroupAccessFromLoginResponse } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-response.interface';

@Injectable()
export class AbaRegisterGetGroupAccessFromLoginService extends AbaRegisterExecuteService<
  GetGroupAccessFromLoginRequestDto,
  IGetGroupAccessFromLoginResponse
> {
  constructor(
    protected readonly rawService: GetGroupAccessFromLoginRawService,
  ) {
    super(
      AbaRegisterGetGroupAccessFromLoginService.name,
      'Obtiene la informacón del grupo de acceso del usuario',
      rawService,
    );
  }

  protected processResponse(
    response: IGetGroupAccessFromLoginResponse,
  ): IGetGroupAccessFromLoginResponse {
    switch (response.status) {
      case GetGroupAccessFromLoginStatusConstants.SUCCESSFULL:
        return response;
      case GetGroupAccessFromLoginStatusConstants.ERROR:
        throw new GetGroupAccessFromLoginException();
      case GetGroupAccessFromLoginStatusConstants.THERE_IS_NO_DATA:
        throw new GetGroupAccessFromLoginThereIsNoDataException();
      case GetGroupAccessFromLoginStatusConstants.USERNAME_DOES_NOT_EXIST:
        throw new GetGroupAccessFromLoginNotFoundException();
      default:
        throw new GetGroupAccessFromLoginException();
    }
  }
}
