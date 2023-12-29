import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { IsPrepaidVoiceLineException } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-a-prepaid-voice-line.exception';
import { IsPrepaidVoiceLineIsPrepaidConstants } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-is-prepaid.constants';
import { IIsPrepaidVoiceLineResponse } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-response.interface';
import { IsPrepaidVoiceLineRawService } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-raw.service';
import { IsPrepaidVoiceLineRequestDto } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-request.dto';
import { IsPrepaidVoiceLineStatusConstants } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-status.constants';

import { IOracleExecute } from 'src/oracle/oracle-execute.interface';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterIsPrepaidVoiceLineService
  extends CommonService
  implements
    IOracleExecute<IsPrepaidVoiceLineRequestDto, IIsPrepaidVoiceLineResponse>
{
  constructor(
    private readonly isPrepaidVoiceLineRawService: IsPrepaidVoiceLineRawService,
  ) {
    super();
  }

  async execute(
    dto: IsPrepaidVoiceLineRequestDto,
    dbConnection?: Connection,
  ): Promise<IIsPrepaidVoiceLineResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsPrepaidVoiceLineService.name,
        method: 'execute',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Obteniendo información de linea prepago',
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsPrepaidVoiceLineService.name,
        method: 'execute',
      });
      const response = await this.isPrepaidVoiceLineRawService.execute(
        dto,
        dbConnection,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsPrepaidVoiceLineService.name,
        method: 'execute',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsPrepaidVoiceLineService.name,
        method: 'execute',
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
  }

  processResponse(
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
