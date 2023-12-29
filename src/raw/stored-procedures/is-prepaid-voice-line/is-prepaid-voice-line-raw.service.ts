import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { IIsPrepaidVoiceLineResponse } from './is-prepaid-voice-line-response.interface';
import { IsPrepaidVoiceLineIsPrepaidConstants } from './is-prepaid-voice-line-is-prepaid.constants';
import { IsPrepaidVoiceLineRequestDto } from './is-prepaid-voice-line-request.dto';
import { IsPrepaidVoiceLineStatusConstants } from './is-prepaid-voice-line-status.constants';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class IsPrepaidVoiceLineRawService extends OracleExecuteStoredProcedureRawService<
  IsPrepaidVoiceLineRequestDto,
  IIsPrepaidVoiceLineResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.IS_PREPAID,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  // async execute(
  //   dto: IsPrepaidVoiceLineRequestDto,
  //   dbConnection?: Connection,
  // ): Promise<IIsPrepaidVoiceLineResponse> {
  //   try {
  //     await super.connect(dbConnection);
  //     const result = await super.executeStoredProcedure(
  //       BossConstants.ACT_PACKAGE,
  //       BossConstants.IS_PREPAID,
  //       this.getParameters(dto),
  //     );
  //     return this.getResponse(result);
  //     // if (
  //     //   response.isPrepaid ==
  //     //     IsPrepaidVoiceLineIsPrepaidConstants.IT_IS_A_PREPAID_VOICE_LINE ||
  //     //   response.status == IsPrepaidVoiceLineStatusConstants.ERROR
  //     // ) {
  //     //   throw new IsPrepaidVoiceLineException();
  //     // }
  //   } catch (error) {
  //     super.exceptionHandler(error, dto);
  //   } finally {
  //     await super.closeConnection(dbConnection !== null);
  //   }
  // }

  protected getParameters(dto: IsPrepaidVoiceLineRequestDto): any {
    return {
      Abaareacode: OracleHelper.stringBindIn(dto.areaCode, 3),
      abaphonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 16),

      isPrepago: OracleHelper.numberBindOut(),
      oStatus: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IIsPrepaidVoiceLineResponse {
    return {
      isPrepaid: (result?.outBinds?.isPrepago ??
        IsPrepaidVoiceLineIsPrepaidConstants.IT_IS_NOT_A_PREPAID_VOICE_LINE) as IsPrepaidVoiceLineIsPrepaidConstants,
      status: (result?.outBinds?.oStatus ??
        IsPrepaidVoiceLineStatusConstants.ERROR) as IsPrepaidVoiceLineStatusConstants,
    };
  }
}
