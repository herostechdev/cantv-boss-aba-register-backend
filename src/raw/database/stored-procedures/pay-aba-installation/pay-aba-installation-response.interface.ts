import { IStatusResponse } from 'src/boss/status-response.interface';
import { PayABAInstallationStatusConstants } from './pay-aba-installation-status.constants';

export type IPayABAInstallationResponse =
  IStatusResponse<PayABAInstallationStatusConstants>;
