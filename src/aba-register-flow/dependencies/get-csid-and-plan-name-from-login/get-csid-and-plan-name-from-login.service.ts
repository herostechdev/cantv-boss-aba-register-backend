import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetCSIdAndPlanNameFromLoginRawService } from 'src/raw/database/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-raw.service';
import { GetCSIdAndPlanNameFromLoginRequestDto } from 'src/raw/database/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-request.dto';
import { GetCSIdAndPlanNameFromLoginStatusConstants } from 'src/raw/database/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-status.constants';
import { GetCSIdAndPlanNameFromLoginThereIsNoDataException } from 'src/raw/database/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-there-is-no-data.exception';
import { GetCSIdAndPlanNameFromLoginException } from 'src/raw/database/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login.exception';
import { IGetCSIdAndPlanNameFromLoginResponse } from 'src/raw/database/stored-procedures/get-csid-and-plan-name-from-login/get-csid-and-plan-name-from-login-response.interface';

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
