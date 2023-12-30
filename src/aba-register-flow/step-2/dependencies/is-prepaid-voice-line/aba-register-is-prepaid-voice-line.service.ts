import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { IsPrepaidVoiceLineException } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-a-prepaid-voice-line.exception';
import { IsPrepaidVoiceLineIsPrepaidConstants } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-is-prepaid.constants';
import { IIsPrepaidVoiceLineResponse } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-response.interface';
import { IsPrepaidVoiceLineRawService } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-raw.service';
import { IsPrepaidVoiceLineRequestDto } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-request.dto';
import { IsPrepaidVoiceLineStatusConstants } from 'src/raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-status.constants';

import { OracleFinalExecuteService } from 'src/oracle/oracle-final-execute.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterIsPrepaidVoiceLineService extends OracleFinalExecuteService<
  IsPrepaidVoiceLineRequestDto,
  IIsPrepaidVoiceLineResponse
> {
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
        message: BossConstants.START,
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsPrepaidVoiceLineService.name,
        method: BossConstants.EXECUTE,
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Obteniendo información de linea prepago',
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsPrepaidVoiceLineService.name,
        method: BossConstants.EXECUTE,
      });
      const response = await this.isPrepaidVoiceLineRawService.execute(
        dto,
        dbConnection,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.END,
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsPrepaidVoiceLineService.name,
        method: BossConstants.EXECUTE,
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsPrepaidVoiceLineService.name,
        method: BossConstants.EXECUTE,
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
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
