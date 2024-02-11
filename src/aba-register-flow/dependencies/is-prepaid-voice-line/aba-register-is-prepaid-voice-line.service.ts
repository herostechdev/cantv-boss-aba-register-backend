import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { IsPrepaidVoiceLineException } from 'src/raw/database/stored-procedures/is-prepaid-voice-line/is-a-prepaid-voice-line.exception';
import { IsPrepaidVoiceLineIsPrepaidConstants } from 'src/raw/database/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-is-prepaid.constants';
import { IsPrepaidVoiceLineRawService } from 'src/raw/database/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-raw.service';
import { IsPrepaidVoiceLineRequestDto } from 'src/raw/database/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-request.dto';
import { IIsPrepaidVoiceLineResponse } from 'src/raw/database/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-response.interface';
import { IsPrepaidVoiceLineStatusConstants } from 'src/raw/database/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-status.constants';

@Injectable()
export class AbaRegisterIsPrepaidVoiceLineService extends AbaRegisterExecuteService<
  IsPrepaidVoiceLineRequestDto,
  IIsPrepaidVoiceLineResponse
> {
  constructor(protected readonly rawService: IsPrepaidVoiceLineRawService) {
    super(
      AbaRegisterIsPrepaidVoiceLineService.name,
      'Obteniendo información de linea prepago',
      rawService,
    );
  }

  protected processResponse(
    response: IIsPrepaidVoiceLineResponse,
  ): IIsPrepaidVoiceLineResponse {
    if (
      response.isPrepaid ==
        IsPrepaidVoiceLineIsPrepaidConstants.IT_IS_A_PREPAID_VOICE_LINE ||
      response.status == IsPrepaidVoiceLineStatusConstants.ERROR
    ) {
      throw new IsPrepaidVoiceLineException();
    }
    return response;
    // switch (response.status) {
    //   case IsPrepaidVoiceLineStatusConstants.SUCCESSFULL:
    //     return response;
    //   case IsPrepaidVoiceLineStatusConstants.ERROR:
    //     throw new IsPrepaidVoiceLineException();
    //   default:
    //     throw new IsPrepaidVoiceLineException();
    // }
  }
}
