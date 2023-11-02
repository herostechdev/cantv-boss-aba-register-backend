import { Injectable } from '@nestjs/common';
import { GetStateFromSerialRequestDto } from './get-state-from-serial-request.dto';
import { GetStateFromSerialStatusConstants } from './get-state-from-serial-status.constants';
import { GetStateFromSerialException } from './get-state-from-serial.exception';
import { IGetStateFromSerialResponse } from './get-state-from-serial-response.interface';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';

@Injectable()
export class GetStateFromSerialService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  // TODO: DESARROLLAR EL SUBSTRING DEL NÚMERO DE TELEFONO  Campo: i_serial   SON LOS PRIMEROS 3 DIGITOS DEL NÚMERO DE TELEFONO
  // TODO: Determinar si la respuesta es un solo estado o una LISTA DE ESTADOS , normalmente devuelve 1 pero es posible que devuelva varios
  async getGetStateFromSerial(
    dto: GetStateFromSerialRequestDto,
  ): Promise<IGetStateFromSerialResponse> {
    try {
      await super.connect();
      const parameters = {
        i_areacode: OracleHelper.numberBindIn(dto.areaCode),
        i_serial: OracleHelper.numberBindIn(dto.phoneNumber),
        o_state: OracleHelper.tableOfStringBindOut(532),
        o_status: OracleHelper.tableOfStringBindOut(532),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.GET_STATE_FROM_SERIAL,
        parameters,
      );
      const response: IGetStateFromSerialResponse = {
        state: OracleHelper.getFirstItem(result, 'o_state'),
        status: (result?.outBinds?.status ??
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
      super.exceptionHandler(error);
    } finally {
      await this.closeConnection();
    }
  }
}