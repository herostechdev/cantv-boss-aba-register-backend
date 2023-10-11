import { Injectable } from '@nestjs/common';
import { GetASAPOrderDetailRequestDto } from './get-asap-order-detail-request.dto';
import { IGetASAPOrderDetailResponse } from './get-asap-order-detail-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';

@Injectable()
export class GetASAPOrderDetailService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async GetASAPOrderDetail(
    dto: GetASAPOrderDetailRequestDto,
  ): Promise<IGetASAPOrderDetailResponse> {
    try {
      // await super.connect();
      // const parameters = {
      //   str_areacode: dto.areaCode,
      //   str_phonenumber: dto.phoneNumber,
      //   str_orderid: null,
      //   str_status: null,
      // };
      // const spResponse = await super.executeStoredProcedure(
      //   OracleConstants.ACT_PACKAGE,
      //   OracleConstants.GET_ORDER_ID_FROM_ABA_SALES,
      //   parameters,
      // );
      // return {
      //   orderId: parameters.str_orderid,
      //   status: parameters.str_status,
      // };
      return null;
    } catch (error) {
      super.exceptionHandler(error, dto.orderId);
    } finally {
      // await this.closeConnection();
    }
  }
}
