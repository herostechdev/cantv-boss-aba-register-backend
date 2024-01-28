import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { Error1003Exception } from 'src/exceptions/error-1003.exception';
import { Error30041Exception } from 'src/exceptions/error-3004-1.exception';
import { Error30055Exception } from 'src/exceptions/error-3005-5.exception';
import { IsValidIpAddressRawService } from 'src/raw/stored-procedures/is-valid-ip-address/is-valid-ip-address-raw.service';
import { IsValidIpAddressRequestDto } from 'src/raw/stored-procedures/is-valid-ip-address/is-valid-ip-address-request.dto';
import { IIsValidIpAddressResponse } from 'src/raw/stored-procedures/is-valid-ip-address/is-valid-ip-address-response.interface';
import { IsValidIpAddressStatusConstants } from 'src/raw/stored-procedures/is-valid-ip-address/is-valid-ip-address-status.constants';

@Injectable()
export class AbaRegisterIsValidIpAddressService extends AbaRegisterExecuteService<
  IsValidIpAddressRequestDto,
  IIsValidIpAddressResponse
> {
  constructor(protected readonly rawService: IsValidIpAddressRawService) {
    super(
      AbaRegisterIsValidIpAddressService.name,
      'Verificando el contrato por número de teléfono',
      rawService,
    );
  }

  protected processResponse(
    response: IIsValidIpAddressResponse,
  ): IIsValidIpAddressResponse {
    switch (response.status) {
      case IsValidIpAddressStatusConstants.SUCCESSFULL:
        return response;
      case IsValidIpAddressStatusConstants.ERROR_1003:
        throw new Error1003Exception();
      case IsValidIpAddressStatusConstants.ERROR_3004_1:
        throw new Error30041Exception();
      case IsValidIpAddressStatusConstants.ERROR_3005_5:
        throw new Error30055Exception();
      case IsValidIpAddressStatusConstants.POOL_RBE_LEASE:
        return response;
      default:
        throw new Error1003Exception();
    }
  }
}
