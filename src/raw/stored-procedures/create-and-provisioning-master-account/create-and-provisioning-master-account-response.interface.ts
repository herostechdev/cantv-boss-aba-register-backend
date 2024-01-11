import { IStatusResponse } from 'src/responses/status-response.interface';
import { CreateAndProvisioningMasterAccountStatusConstants } from './create-and-provisioning-master-account-status.constants';

export type ICreateAndProvisioningMasterAccountResponse =
  IStatusResponse<CreateAndProvisioningMasterAccountStatusConstants>;
