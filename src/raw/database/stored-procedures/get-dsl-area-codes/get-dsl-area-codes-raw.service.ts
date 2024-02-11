import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetDSLAreaCodesRequestDto } from './get-dsl-area-codes-request.dto';
import { GetDSLAreaCodesStatusConstants } from './get-dsl-area-codes-status.constants';
import { IGetDSLAreaCodesResponse } from './get-dsl-area-codes-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetDSLAreaCodesRawService extends OracleExecuteStoredProcedureRawService<
  GetDSLAreaCodesRequestDto,
  IGetDSLAreaCodesResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_DSL_AREA_CODES,
      oracleConfigurationService,
    );
  }

  // async execute(
  //   dto: GetDSLAreaCodesRequestDto,
  //   dbConnection?: Connection,
  // ): Promise<IGetDSLAreaCodesResponse> {
  //   try {
  //     await super.connect(dbConnection);
  //     const result = await super.executeStoredProcedure(
  //       BossConstants.ACT_PACKAGE,
  //       BossConstants.GET_DSL_AREA_CODES,
  //       this.getParameters(dto),
  //       dto,
  //     );
  //     return this.getResponse(result);
  //   } catch (error) {
  //     await this.updateDslAbaRegistersService.errorUpdate({
  //       areaCode: dto.areaCode,
  //       phoneNumber: dto.phoneNumber,
  //       registerStatus: BossConstants.NOT_PROCESSED,
  //     });
  //     super.exceptionHandler(error);
  //   } finally {
  //     await super.closeConnection(dbConnection !== null, dto);
  //   }
  // }

  protected getParameters(dto: GetDSLAreaCodesRequestDto): any {
    return {
      areacodes: OracleHelper.tableOfStringBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetDSLAreaCodesResponse {
    return {
      areaCodes: OracleHelper.getItems(result, 'areacodes'),
      status: (result?.outBinds?.o_status ??
        GetDSLAreaCodesStatusConstants.ERROR) as GetDSLAreaCodesStatusConstants,
    };
  }
}
