import { Injectable } from '@nestjs/common';
import { Error2002Exception } from 'src/exceptions/error-2002.exception';
import { GetOrderIdFromABASalesRequestDto } from './get-order-id-from-aba-sales-request.dto';
import { GetOrderIdFromABASalesStatusConstants } from './get-order-id-from-aba-sales-status.constants';
import { GetOrderIdFromABASalesException } from './get-order-id-from-aba-sales.exception';
import { IGetOrderIdFromABASalesResponse } from './get-order-id-from-aba-sales-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class GetOrderIdFromABASalesService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async getOrderIdFromABASales(
    dto: GetOrderIdFromABASalesRequestDto,
  ): Promise<IGetOrderIdFromABASalesResponse> {
    try {
      Wlog.instance.info({
        message: 'Invocando GetOrderidFromAbaSales',
        bindingData: BossHelper.getPhoneNumber(dto),
        clazz: GetOrderIdFromABASalesService.name,
        method: 'getOrderIdFromABASales',
      });
      await super.connect();
      const parameters = {
        str_areacode: OracleHelper.stringBindIn(dto.areaCode),
        str_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber),
        str_orderid: OracleHelper.numberBindOut(),
        str_status: OracleHelper.numberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        BossConstants.ACT_PACKAGE,
        BossConstants.GET_ORDER_ID_FROM_ABA_SALES,
        parameters,
      );
      const status = (result?.outBinds?.str_status ??
        GetOrderIdFromABASalesStatusConstants.ERROR) as GetOrderIdFromABASalesStatusConstants;
      const response: IGetOrderIdFromABASalesResponse = {
        orderId: result?.outBinds?.str_orderid,
        status: status,
      };
      switch (response.status) {
        case GetOrderIdFromABASalesStatusConstants.SUCCESSFULL:
          return response;
        case GetOrderIdFromABASalesStatusConstants.ERROR:
          throw new GetOrderIdFromABASalesException(result);
        case GetOrderIdFromABASalesStatusConstants.PHONE_WITHOUT_PRE_ORDER:
          return response;
        case GetOrderIdFromABASalesStatusConstants.PRE_ORDER_NOT_ACCEPTED_OR_COMPLETED:
          throw new Error2002Exception();
        default:
          throw new GetOrderIdFromABASalesException(result);
      }
    } catch (error) {
      Wlog.instance.error({
        message: 'Invocando GetOrderidFromAbaSales',
        bindingData: BossHelper.getPhoneNumber(dto),
        clazz: GetOrderIdFromABASalesService.name,
        method: 'getOrderIdFromABASales',
        error: error,
        stack: error?.stack,
      });
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }
}
