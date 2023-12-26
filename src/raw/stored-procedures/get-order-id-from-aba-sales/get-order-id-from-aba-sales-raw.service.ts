import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { GetOrderIdFromABASalesRequestDto } from './get-order-id-from-aba-sales-request.dto';
import { GetOrderIdFromABASalesStatusConstants } from './get-order-id-from-aba-sales-status.constants';
import { IGetOrderIdFromABASalesResponse } from './get-order-id-from-aba-sales-response.interface';
import { IOracleRawExecute } from 'src/oracle/oracle-raw-execute.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetOrderIdFromABASalesRawService
  extends OracleDatabaseService
  implements
    IOracleRawExecute<
      GetOrderIdFromABASalesRequestDto,
      IGetOrderIdFromABASalesResponse
    >
{
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: GetOrderIdFromABASalesRequestDto,
    dbConnection?: Connection,
  ): Promise<IGetOrderIdFromABASalesResponse> {
    try {
      await super.connect(dbConnection);
      const result = await super.executeStoredProcedure(
        BossConstants.ACT_PACKAGE,
        BossConstants.GET_ORDER_ID_FROM_ABA_SALES,
        this.getParameters(dto),
      );
      return this.getResponse(result);
    } catch (error) {
      await this.updateDslAbaRegistersService.errorUpdate({
        areaCode: String(dto.areaCode),
        phoneNumber: String(dto.phoneNumber),
        registerStatus: BossConstants.NOT_PROCESSED,
      });
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection(dbConnection !== null, dto);
    }
  }

  getParameters(dto: GetOrderIdFromABASalesRequestDto): any {
    return {
      str_areacode: OracleHelper.stringBindIn(dto.areaCode),
      str_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber),

      str_orderid: OracleHelper.numberBindOut(),
      str_status: OracleHelper.numberBindOut(),
    };
  }

  getResponse(result: any): IGetOrderIdFromABASalesResponse {
    const status = (result?.outBinds?.str_status ??
      GetOrderIdFromABASalesStatusConstants.ERROR) as GetOrderIdFromABASalesStatusConstants;
    return {
      orderId: result?.outBinds?.str_orderid,
      status: status,
    };
  }
}
