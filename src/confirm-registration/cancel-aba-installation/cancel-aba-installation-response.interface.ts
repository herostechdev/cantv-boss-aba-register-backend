import { IStatusResponse } from 'src/responses/status-response.interface';
import { CancelABAInstallationStatusConstants } from './cancel-aba-installation-status.constants';

export type ICancelABAInstallationResponse =
  IStatusResponse<CancelABAInstallationStatusConstants>;
