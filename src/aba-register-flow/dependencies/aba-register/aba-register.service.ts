import { Injectable } from '@nestjs/common';
import { ABARegisterException } from 'src/raw/database/stored-procedures/aba-register/aba-register.exception';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { AbaRegisterRawService } from 'src/raw/database/stored-procedures/aba-register/aba-register-raw.service';
import { AbaRegisterRequestDto } from 'src/raw/database/stored-procedures/aba-register/aba-register-request.dto';
import { AbaRegisterStatusConstants } from 'src/raw/database/stored-procedures/aba-register/aba-register-status.constants';
import { Error10023Exception } from 'src/exceptions/error-1002-3.exception';
import { IAbaRegisterResponse } from 'src/raw/database/stored-procedures/aba-register/aba-register-response.interface';
import { BossConstants } from 'src/boss/boss.constants';

@Injectable()
export class AbaRegisterService extends AbaRegisterExecuteService<
  AbaRegisterRequestDto,
  IAbaRegisterResponse
> {
  constructor(protected readonly rawService: AbaRegisterRawService) {
    super(AbaRegisterService.name, 'Registro ABA', rawService);
  }

  protected processResponse(
    response: IAbaRegisterResponse,
  ): IAbaRegisterResponse {
    switch (response.status) {
      case AbaRegisterStatusConstants.SUCCESSFULL:
        return response;
      case AbaRegisterStatusConstants.ERROR:
        throw new ABARegisterException();
      case AbaRegisterStatusConstants.THERE_IS_NO_DATA:
        throw new Error10023Exception(BossConstants.ABA_REGISTER);
      default:
        throw new ABARegisterException();
    }
  }
}
