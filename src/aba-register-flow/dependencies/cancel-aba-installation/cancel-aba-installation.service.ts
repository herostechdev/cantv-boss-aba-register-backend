import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { CancelABAInstallationException } from 'src/raw/stored-procedures/cancel-aba-installation/cancel-aba-installation.exception';
import { CancelAbaInstallationRawService } from 'src/raw/stored-procedures/cancel-aba-installation/cancel-aba-installation-raw.service';
import { CancelAbaInstallationRequestDto } from 'src/raw/stored-procedures/cancel-aba-installation/cancel-aba-installation-request.dto';
import { CancelABAInstallationStatusConstants } from 'src/raw/stored-procedures/cancel-aba-installation/cancel-aba-installation-status.constants';
import { CancelABAInstallationThereIsNoDataException } from 'src/raw/stored-procedures/cancel-aba-installation/cancel-aba-installation-there-is-no-data.exception';
import { ICancelABAInstallationResponse } from 'src/raw/stored-procedures/cancel-aba-installation/cancel-aba-installation-response.interface';

@Injectable()
export class AbaRegisterCancelAbaInstallationService extends AbaRegisterExecuteService<
  CancelAbaInstallationRequestDto,
  ICancelABAInstallationResponse
> {
  constructor(protected readonly rawService: CancelAbaInstallationRawService) {
    super(
      AbaRegisterCancelAbaInstallationService.name,
      'Cancelando la instalación de ABA',
      rawService,
    );
  }

  protected processResponse(
    response: ICancelABAInstallationResponse,
  ): ICancelABAInstallationResponse {
    switch (response.status) {
      case CancelABAInstallationStatusConstants.SUCCESSFULL:
        return response;
      case CancelABAInstallationStatusConstants.ERROR:
        throw new CancelABAInstallationException();
      case CancelABAInstallationStatusConstants.THERE_IS_NO_DATA:
        throw new CancelABAInstallationThereIsNoDataException();
      default:
        throw new CancelABAInstallationException();
    }
  }
}
