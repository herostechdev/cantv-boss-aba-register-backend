import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { IVerifyContractByPhoneResponse } from 'src/raw/database/stored-procedures/verify-contract-by-phone/verify-contract-by-phone-response.interface';
import { VerifyContractByPhoneRawService } from 'src/raw/database/stored-procedures/verify-contract-by-phone/verify-contract-by-phone-raw.service';
import { VerifyContractByPhoneRequestDto } from 'src/raw/database/stored-procedures/verify-contract-by-phone/verify-contract-by-phone-request.dto';
import { VerifyContractByPhoneStatusConstants } from 'src/raw/database/stored-procedures/verify-contract-by-phone/verify-contract-by-phone-status.constants';
import { VerifyContractByPhoneException } from 'src/raw/database/stored-procedures/verify-contract-by-phone/verify-contract-by-phone.exception';

@Injectable()
export class AbaRegisterVerifyContractByPhoneService extends AbaRegisterExecuteService<
  VerifyContractByPhoneRequestDto,
  IVerifyContractByPhoneResponse
> {
  constructor(protected readonly rawService: VerifyContractByPhoneRawService) {
    super(
      AbaRegisterVerifyContractByPhoneService.name,
      'Verificando el contrato por número de teléfono',
      rawService,
    );
  }

  protected processResponse(
    response: IVerifyContractByPhoneResponse,
  ): IVerifyContractByPhoneResponse {
    switch (response.status) {
      case VerifyContractByPhoneStatusConstants.SUCCESSFULL:
        return response;
      case VerifyContractByPhoneStatusConstants.ERROR:
        throw new VerifyContractByPhoneException();
      default:
        throw new VerifyContractByPhoneException();
    }
  }
}
