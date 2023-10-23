import { IStatusResponse } from 'src/responses/status-response.interface';
import { CreateAndProvisioningMasterActStatusConstants } from './create-and-provisioning-master-act-status.constants';

export type ICreateAndProvisioningMasterActResponse =
  IStatusResponse<CreateAndProvisioningMasterActStatusConstants>;
