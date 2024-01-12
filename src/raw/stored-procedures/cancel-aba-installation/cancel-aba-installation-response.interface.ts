import { IStatusResponse } from 'src/boss/status-response.interface';
import { CancelABAInstallationStatusConstants } from './cancel-aba-installation-status.constants';

export type ICancelABAInstallationResponse =
  IStatusResponse<CancelABAInstallationStatusConstants>;
