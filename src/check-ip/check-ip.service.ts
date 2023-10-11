import { Injectable } from '@nestjs/common';
import * as oracledb from 'oracledb';
import { CheckIpRequestDto } from './check-ip-request.dto';
import { ICheckIpResponse } from './check-ip-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle.constants';
import { ArrayHelper } from 'src/system/infrastructure/helpers/array.helper';

@Injectable()
export class CheckIpService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async checkIp(dto: CheckIpRequestDto): Promise<ICheckIpResponse> {
    try {
      await super.connect();
      const parameters = {
        i_ipsource: OracleConstants.stringBindIn(dto.ip),
        o_expiredate: OracleConstants.tableOfStringBindOut(1, 532),
        o_status: OracleConstants.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.GET_IF_REMOTE_INSTALLER_IP,
        parameters,
      );
      return {
        expireDate: ArrayHelper.isArrayWithItems(result?.outBinds?.o_expiredate)
          ? result.outBinds.o_expiredate[0]
          : null,
        status: ArrayHelper.isArrayWithItems(result?.outBinds?.o_status)
          ? result.outBinds.o_status[0]
          : null,
      };
    } catch (error) {
      console.log();
      console.log('ERROR >>');
      console.log(error);
      //   super.exceptionHandler(error, dto?.ip);
    } finally {
      await this.closeConnection();
    }
  }

  // async checkIp(dto: CheckIpRequestDto): Promise<ICheckIpResponse> {
  //   try {
  //     await super.connect();
  //     const parameters = {
  //       abadslamportid: {
  //         val: dto.ip,
  //         type: oracledb.DB_TYPE_VARCHAR,
  //         dir: oracledb.BIND_IN,
  //         maxSize: 15,
  //       },
  //       abaareacode: {
  //         val: dto.ip,
  //         type: oracledb.DB_TYPE_VARCHAR,
  //         dir: oracledb.BIND_IN,
  //         maxSize: 3,
  //       },
  //       abaphonenumber: {
  //         val: dto.ip,
  //         type: oracledb.DB_TYPE_VARCHAR,
  //         dir: oracledb.BIND_IN,
  //         maxSize: 16,
  //       },
  //       abauserlogin: {
  //         val: dto.ip,
  //         type: oracledb.DB_TYPE_VARCHAR,
  //         dir: oracledb.BIND_IN,
  //         maxSize: 32,
  //       },
  //       abaportwithcontract: {
  //         val: 123,
  //         type: oracledb.DB_TYPE_NUMBER,
  //         dir: oracledb.BIND_IN,
  //       },
  //       Status: {
  //         dir: oracledb.BIND_OUT,
  //         type: oracledb.DB_TYPE_NUMBER,
  //       },
  //     };
  //     const result = await super.executeStoredProcedure(
  //       OracleConstants.BOSS_PACKAGE,
  //       OracleConstants.CHECK_IP,
  //       parameters,
  //     );
  //     console.log('result.outBinds', result.outBinds);
  //     return null;
  //     // return {
  //     //   expireDate: parameters.o_expiredate,
  //     //   status: parameters.o_status,
  //     // };
  //   } catch (error) {
  //     console.log();
  //     console.log('ERROR >>');
  //     console.log(error);
  //     //   super.exceptionHandler(error, dto?.ip);
  //   } finally {
  //     await this.closeConnection();
  //   }
  // }

  async mostrarContenidoProcedimiento(nombreProcedimiento) {
    try {
      // Obtiene la definición del procedimiento almacenado
      const query = `
      SELECT text FROM all_source  WHERE name = 'CheckIp' ORDER BY line;
    `;

      const result = await this.dbConnection.execute(query, [
        nombreProcedimiento,
      ]);

      // Recorre los resultados y muestra el contenido del procedimiento por pantalla
      for (const row of result.rows) {
        console.log(row[0]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
