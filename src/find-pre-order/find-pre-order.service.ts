import { Injectable } from '@nestjs/common';
import { FindPreOrderRequestDto } from './find-pre-order-request.dto';
import { IFindPreOrderResponse } from './find-pre-order-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { FindPreOrderStatusConstants } from './find-pre-order-status.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { FindPreOrderErrorException } from './find-pre-order-error.exception';
import { Error2002Exception } from 'src/exceptions/error-2002.exception';

@Injectable()
export class FindPreOrderService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async findPreOrder(
    dto: FindPreOrderRequestDto,
  ): Promise<IFindPreOrderResponse> {
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
      const response: IFindPreOrderResponse = {
        orderId: result?.outBinds?.str_orderid,
        status: (result?.outBinds?.str_status ??
          FindPreOrderStatusConstants.ERROR) as FindPreOrderStatusConstants,
      };
      switch (response.status) {
        case FindPreOrderStatusConstants.SUCCESSFULL:
          return response;
        case FindPreOrderStatusConstants.ERROR:
          throw new FindPreOrderErrorException();
        case FindPreOrderStatusConstants.PHONE_WITHOUT_PRE_ORDER:
          return response;
        case FindPreOrderStatusConstants.PRE_ORDER_NOT_ACCEPTED_OR_COMPLETED:
          throw new Error2002Exception();
        default:
          throw new FindPreOrderErrorException();
      }
    } catch (error) {
      super.exceptionHandler(error, `${dto?.areaCode}-${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }
}
