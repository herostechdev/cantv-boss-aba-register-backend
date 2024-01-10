import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetCSIdAndPlanNameFromLoginException } from 'src/raw/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login.exception';
import { GetCSIdAndPlanNameFromLoginRawService } from 'src/raw/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-raw.service';
import { GetCSIdAndPlanNameFromLoginRequestDto } from 'src/raw/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-request.dto';
import { GetCSIdAndPlanNameFromLoginThereIsNoDataException } from 'src/raw/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-there-is-no-data.exception';
import { GetCSIdAndPlanNameFromLoginStatusConstants } from 'src/raw/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-status.constants';
import { IGetCSIdAndPlanNameFromLoginResponse } from 'src/raw/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-response.interface';

@Injectable()
export class AbaRegisterGetCSIdAndPlanNameFromLoginService extends AbaRegisterExecuteService<
  GetCSIdAndPlanNameFromLoginRequestDto,
  IGetCSIdAndPlanNameFromLoginResponse
> {
  constructor(
    protected readonly rawService: GetCSIdAndPlanNameFromLoginRawService,
  ) {
    super(
      AbaRegisterGetCSIdAndPlanNameFromLoginService.name,
      'Obteniendo el CS Id y el Plan contratado desde el usuario (login)',
      rawService,
    );
  }

  protected processResponse(
    response: IGetCSIdAndPlanNameFromLoginResponse,
  ): IGetCSIdAndPlanNameFromLoginResponse {
    switch (response.status) {
      case GetCSIdAndPlanNameFromLoginStatusConstants.SUCCESSFULL:
        return response;
      case GetCSIdAndPlanNameFromLoginStatusConstants.ERROR:
        throw new GetCSIdAndPlanNameFromLoginException();
      case GetCSIdAndPlanNameFromLoginStatusConstants.THERE_IS_NO_DATA:
        throw new GetCSIdAndPlanNameFromLoginThereIsNoDataException();
      default:
        throw new GetCSIdAndPlanNameFromLoginException();
    }
  }
}
