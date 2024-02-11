import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetAbaPlanForKenanRequestDto } from './get-aba-plan-for-kenan-request.dto';
import { IGetAbaPlanForKenanResponse } from './get-aba-plan-for-kenan-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteFunctionRawService } from 'src/oracle/oracle-execute-function-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetAbaPlanForKenanRawService extends OracleExecuteFunctionRawService<
  GetAbaPlanForKenanRequestDto,
  IGetAbaPlanForKenanResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      null,
      BossConstants.GET_ABA_PLAN_FOR_KENAN,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: GetAbaPlanForKenanRequestDto): any {
    return {
      abaplan: OracleHelper.stringBindIn(dto.technicalPlanName),
      result: OracleHelper.stringBindOut(),
    };
  }

  protected getResponse(result: any): IGetAbaPlanForKenanResponse {
    return {
      planCode: result?.outBinds?.result,
    };
  }
}
