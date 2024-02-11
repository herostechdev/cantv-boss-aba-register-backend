import { IStatusResponse } from 'src/boss/status-response.interface';
import { GetFirstLetterFromABARequestStatusConstants } from './get-first-letter-from-aba-request-status.constants';

export interface IGetFirstLetterFromABARequestResponse
  extends IStatusResponse<GetFirstLetterFromABARequestStatusConstants> {
  firstLetter: string;
}
