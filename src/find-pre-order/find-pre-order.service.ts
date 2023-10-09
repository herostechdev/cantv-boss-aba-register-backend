import { Injectable } from '@nestjs/common';
import { FindPreOrderRequestDto } from './find-pre-order-request.dto';
import { IFindPreOrderResponse } from './find-pre-order-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle.constants';

@Injectable()
export class FindPreOrderService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async FindPreOrder(
    dto: FindPreOrderRequestDto,
  ): Promise<IFindPreOrderResponse> {
    try {
      await super.connect();
      const parameters = {
        str_areacode: dto.areaCode,
        str_phonenumber: dto.phoneNumber,
        str_orderid: null,
        str_status: null,
      };
      const spResponse = await super.executeStoredProcedure(
        OracleConstants.ACT_PACKAGE,
        OracleConstants.GET_ORDER_ID_FROM_ABA_SALES,
        parameters,
      );
      return {
        orderId: parameters.str_orderid,
        status: parameters.str_status,
      };
    } catch (error) {
      super.exceptionHandler(error, `${dto?.areaCode}-${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }
}
