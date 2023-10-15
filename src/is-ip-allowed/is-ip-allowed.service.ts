import { Injectable } from '@nestjs/common';
import { IsIPAllowedRequestDto } from './is-ip-allowed-request.dto';
import { IIsIPAllowedResponse } from './is-ip-allowed-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class IsIPAllowedService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async isIPAllowed(dto: IsIPAllowedRequestDto): Promise<IIsIPAllowedResponse> {
    try {
      console.log();
      console.log('isIPAllowed');
      console.log('Connecting to database....');
      await super.connect();
      console.log('Database connected!!!');
      const parameters = {
        i_ipsource: OracleHelper.stringBindIn(dto.ip),
        o_expiredate: OracleHelper.tableOfStringBindOut(1, 532),
        o_status: OracleHelper.tableOfNumberBindOut(),
      };
      console.log('Parameters');
      console.log(parameters);
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.GET_IF_REMOTE_INSTALLER_IP,
        parameters,
      );
      console.log('parameters');
      console.log(parameters);
      const response = {
        expireDate: OracleHelper.getFirstItem(result, 'o_expiredate'),
        status: OracleHelper.getFirstItem(result, 'o_status'),
      };
      console.log('response');
      console.log(response);
      return response;
    } catch (error) {
      console.log();
      console.log('ERROR >>');
      console.log(error);
      //   super.exceptionHandler(error, dto?.ip);
    } finally {
      console.log('closeConnection');
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
