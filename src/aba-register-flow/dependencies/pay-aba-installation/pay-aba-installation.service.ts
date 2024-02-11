import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { CancelABAInstallationException } from 'src/raw/database/stored-procedures/pay-aba-installation/pay-aba-installation.exception';
import { IPayABAInstallationResponse } from 'src/raw/database/stored-procedures/pay-aba-installation/pay-aba-installation-response.interface';
import { PayAbaInstallationRawService } from 'src/raw/database/stored-procedures/pay-aba-installation/pay-aba-installation-raw.service';
import { PayAbaInstallationRequestDto } from 'src/raw/database/stored-procedures/pay-aba-installation/pay-aba-installation-request.dto';
import { PayABAInstallationStatusConstants } from 'src/raw/database/stored-procedures/pay-aba-installation/pay-aba-installation-status.constants';
import { PayABAInstallationThereIsNoDataException } from 'src/raw/database/stored-procedures/pay-aba-installation/pay-aba-installation-there-is-no-data.exception';

@Injectable()
export class AbaRegisterPayAbaInstallationService extends AbaRegisterExecuteService<
  PayAbaInstallationRequestDto,
  IPayABAInstallationResponse
> {
  constructor(protected readonly rawService: PayAbaInstallationRawService) {
    super(
      AbaRegisterPayAbaInstallationService.name,
      'Pagando la instalación de ABA',
      rawService,
    );
  }

  protected processResponse(
    response: IPayABAInstallationResponse,
  ): IPayABAInstallationResponse {
    switch (response.status) {
      case PayABAInstallationStatusConstants.SUCCESSFULL:
        return response;
      case PayABAInstallationStatusConstants.ERROR:
        throw new CancelABAInstallationException();
      case PayABAInstallationStatusConstants.THERE_IS_NO_DATA:
        throw new PayABAInstallationThereIsNoDataException();
      default:
        throw new CancelABAInstallationException();
    }
  }
}
