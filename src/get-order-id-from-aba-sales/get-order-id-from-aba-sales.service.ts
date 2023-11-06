import { Injectable } from '@nestjs/common';
import { GetOrderIdFromABASalesRequestDto } from './get-order-id-from-aba-sales-request.dto';
import { GetOrderIdFromABASalesStatusConstants } from './get-order-id-from-aba-sales-status.constants';
import { GetOrderIdFromABASalesException } from './get-order-id-from-aba-sales.exception';
import { IGetOrderIdFromABASalesResponse } from './get-order-id-from-aba-sales-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class GetOrderIdFromABASalesService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async GetOrderIdFromABASales(
    dto: GetOrderIdFromABASalesRequestDto,
  ): Promise<IGetOrderIdFromABASalesResponse> {
    try {
      await super.connect();
      const parameters = {
        str_areacode: OracleHelper.stringBindIn(dto.areaCode),
        str_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber),
        str_orderid: OracleHelper.numberBindOut(),
        str_status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.ACT_PACKAGE,
        OracleConstants.GET_ORDER_ID_FROM_ABA_SALES,
        parameters,
      );
      const status = (OracleHelper.getFirstItem(result, 'str_status') ??
        GetOrderIdFromABASalesStatusConstants.INTERNAL_ERROR) as GetOrderIdFromABASalesStatusConstants;
      const response: IGetOrderIdFromABASalesResponse = {
        orderId: OracleHelper.getFirstItem(result, 'str_orderid'),
        status: status,
      };
      switch (response.status) {
        case GetOrderIdFromABASalesStatusConstants.SUCCESSFULL:
          return response;
        case GetOrderIdFromABASalesStatusConstants.INTERNAL_ERROR:
          throw new GetOrderIdFromABASalesException();
        case GetOrderIdFromABASalesStatusConstants.IMVALID_IP:
          return response;
        default:
          throw new GetOrderIdFromABASalesException();
      }
    } catch (error) {
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }
}
