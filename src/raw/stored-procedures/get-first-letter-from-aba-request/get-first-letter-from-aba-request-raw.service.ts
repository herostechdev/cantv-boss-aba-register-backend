import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetFirstLetterFromABARequestDto } from './get-first-letter-from-aba-request-request.dto';
import { GetFirstLetterFromABARequestStatusConstants } from './get-first-letter-from-aba-request-status.constants';
import { IGetFirstLetterFromABARequestResponse } from './get-first-letter-from-aba-request-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { GetFirstLetterFromABARequestException } from './get-first-letter-from-aba-request.exception';

@Injectable()
export class GetFirstLetterFromABARequestRawService extends OracleExecuteStoredProcedureRawService<
  GetFirstLetterFromABARequestDto,
  IGetFirstLetterFromABARequestResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_FIRST_LETTER_FROM_ABA_REQUEST,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: GetFirstLetterFromABARequestDto): any {
    return {
      sz_Areacode: OracleHelper.stringBindIn(dto.areaCode),
      s_Phonenumber: OracleHelper.stringBindIn(dto.phoneNumber),

      sz_FirstLetter: OracleHelper.stringBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetFirstLetterFromABARequestResponse {
    const response = {
      firstLetter: result?.outBinds?.sz_FirstLetter,
      status: (result?.outBinds?.o_status ??
        GetFirstLetterFromABARequestStatusConstants.ERROR) as GetFirstLetterFromABARequestStatusConstants,
    };
    switch (response.status) {
      case GetFirstLetterFromABARequestStatusConstants.SUCCESSFULL:
        return response;
      case GetFirstLetterFromABARequestStatusConstants.ERROR:
        throw new GetFirstLetterFromABARequestException();
      case GetFirstLetterFromABARequestStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetFirstLetterFromABARequestException();
    }
  }
}
