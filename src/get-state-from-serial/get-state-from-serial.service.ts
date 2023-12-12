import { Injectable } from '@nestjs/common';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { GetStateFromSerialRequestDto } from './get-state-from-serial-request.dto';
import { GetStateFromSerialStatusConstants } from './get-state-from-serial-status.constants';
import { GetStateFromSerialException } from './get-state-from-serial.exception';
import { IGetStateFromSerialResponse } from './get-state-from-serial-response.interface';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { UpdateDslAbaRegistersService } from 'src/dsl-aba-registers/update-dsl-aba-registers/update-dsl-aba-registers.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class GetStateFromSerialService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersService,
  ) {
    super(oracleConfigurationService);
  }

  async getStateFromSerial(
    dto: GetStateFromSerialRequestDto,
  ): Promise<IGetStateFromSerialResponse> {
    try {
      Wlog.instance.info({
        message: 'Inicio',
        data: BossHelper.getPhoneNumber(dto),
        clazz: GetStateFromSerialService.name,
        method: 'getStateFromSerial',
      });
      await super.connect();
      const parameters = {
        i_areacode: OracleHelper.numberBindIn(Number(dto.areaCode)),
        i_serial: OracleHelper.numberBindIn(
          Number(BossHelper.getSerial(dto.phoneNumber)),
        ),
        o_state: OracleHelper.tableOfStringBindOut(),
        o_status: OracleHelper.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        BossConstants.BOSS_PACKAGE,
        BossConstants.GET_STATE_FROM_SERIAL,
        parameters,
      );
      const response: IGetStateFromSerialResponse = {
        states: OracleHelper.getItems(result, 'o_state'),
        status: (OracleHelper.getFirstItem(result, 'o_status') ??
          GetStateFromSerialStatusConstants.ERROR) as GetStateFromSerialStatusConstants,
      };
      switch (response.status) {
        case GetStateFromSerialStatusConstants.SUCCESSFULL:
          return response;
        case GetStateFromSerialStatusConstants.ERROR:
          throw new GetStateFromSerialException();
        case GetStateFromSerialStatusConstants.THERE_IS_NO_DATA:
          return response;
        default:
          throw new GetStateFromSerialException();
      }
    } catch (error) {
      Wlog.instance.error({
        message: 'Invocando GetOrderidFromAbaSales',
        data: BossHelper.getPhoneNumber(dto),
        clazz: GetStateFromSerialService.name,
        method: 'getStateFromSerial',
        error: error,
        stack: error?.stack,
      });
      await this.updateDslAbaRegistersService.update({
        areaCode: String(dto.areaCode),
        phoneNumber: String(dto.phoneNumber),
        registerStatus: BossConstants.NOT_PROCESSED,
      });
      super.exceptionHandler(error);
    } finally {
      await this.closeConnection();
    }
  }
}
