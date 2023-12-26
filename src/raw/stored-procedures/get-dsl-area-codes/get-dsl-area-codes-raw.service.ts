import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { GetDSLAreaCodesRequestDto } from './get-dsl-area-codes-request.dto';
import { GetDSLAreaCodesStatusConstants } from './get-dsl-area-codes-status.constants';
import { IGetDSLAreaCodesResponse } from './get-dsl-area-codes-response.interface';
import { IOracleRawExecute } from 'src/oracle/oracle-raw-execute.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersService } from 'src/dsl-aba-registers/update-dsl-aba-registers/update-dsl-aba-registers.service';

@Injectable()
export class GetDSLAreaCodesRawService
  extends OracleDatabaseService
  implements
    IOracleRawExecute<GetDSLAreaCodesRequestDto, IGetDSLAreaCodesResponse>
{
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: GetDSLAreaCodesRequestDto,
    dbConnection?: Connection,
  ): Promise<IGetDSLAreaCodesResponse> {
    try {
      await super.connect(dbConnection);
      const result = await super.executeStoredProcedure(
        BossConstants.ACT_PACKAGE,
        BossConstants.GET_DSL_AREA_CODES,
        this.getParameters(dto),
        dto,
      );
      return this.getResponse(result);
    } catch (error) {
      await this.updateDslAbaRegistersService.errorUpdate({
        areaCode: String(dto.areaCode),
        phoneNumber: String(dto.phoneNumber),
        registerStatus: BossConstants.NOT_PROCESSED,
      });
      super.exceptionHandler(error);
    } finally {
      await super.closeConnection(dbConnection !== null, dto);
    }
  }

  getParameters(dto: GetDSLAreaCodesRequestDto): any {
    return {
      areacodes: OracleHelper.tableOfStringBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  getResponse(result: any): IGetDSLAreaCodesResponse {
    return {
      areaCodes: OracleHelper.getItems(result, 'areacodes'),
      status: (result?.outBinds?.o_status ??
        GetDSLAreaCodesStatusConstants.ERROR) as GetDSLAreaCodesStatusConstants,
    };
  }
}
