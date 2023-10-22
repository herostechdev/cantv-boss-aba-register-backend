import { IStatusResponse } from 'src/responses/status-number-response.interface';
import { IsPrepaidVoiceLineStatusConstants } from './is-prepaid-voice-line-status.constants';
import { IsPrepaidVoiceLineIsPrepaidConstants } from './is-prepaid-voice-line-is-prepaid.constants';

export interface IIsPrepaidVoiceLineResponse
  extends IStatusResponse<IsPrepaidVoiceLineStatusConstants> {
  isPrepaid: IsPrepaidVoiceLineIsPrepaidConstants;
}
