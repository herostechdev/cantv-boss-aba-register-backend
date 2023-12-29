import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { GetOrderIdFromABASalesRequestDto } from './get-order-id-from-aba-sales-request.dto';
import { GetOrderIdFromABASalesStatusConstants } from './get-order-id-from-aba-sales-status.constants';
import { IGetOrderIdFromABASalesResponse } from './get-order-id-from-aba-sales-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetOrderIdFromABASalesRawService extends OracleExecuteStoredProcedureRawService<
  GetOrderIdFromABASalesRequestDto,
  IGetOrderIdFromABASalesResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_ORDER_ID_FROM_ABA_SALES,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  // async execute(
  //   dto: GetOrderIdFromABASalesRequestDto,
  //   dbConnection?: Connection,
  // ): Promise<IGetOrderIdFromABASalesResponse> {
  //   try {
  //     await super.connect(dbConnection);
  //     const result = await super.executeStoredProcedure(
  //       BossConstants.ACT_PACKAGE,
  //       BossConstants.GET_ORDER_ID_FROM_ABA_SALES,
  //       this.getParameters(dto),
  //     );
  //     return this.getResponse(result);
  //   } catch (error) {
  //     await this.updateDslAbaRegistersService.errorUpdate({
  //       areaCode: String(dto.areaCode),
  //       phoneNumber: String(dto.phoneNumber),
  //       registerStatus: BossConstants.NOT_PROCESSED,
  //     });
  //     super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
  //   } finally {
  //     await this.closeConnection(dbConnection !== null, dto);
  //   }
  // }

  protected getParameters(dto: GetOrderIdFromABASalesRequestDto): any {
    return {
      str_areacode: OracleHelper.stringBindIn(dto.areaCode),
      str_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber),

      str_orderid: OracleHelper.numberBindOut(),
      str_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetOrderIdFromABASalesResponse {
    const status = (result?.outBinds?.str_status ??
      GetOrderIdFromABASalesStatusConstants.ERROR) as GetOrderIdFromABASalesStatusConstants;
    return {
      orderId: result?.outBinds?.str_orderid,
      status: status,
    };
  }
}
