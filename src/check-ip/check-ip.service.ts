import { Injectable } from '@nestjs/common';
import { CheckIpRequestDto } from './check-ip-request.dto';
import { ICheckIpResponse } from './check-ip-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';

@Injectable()
export class CheckIpService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async checkIp(dto: CheckIpRequestDto): Promise<ICheckIpResponse> {
    try {
      console.log();
      console.log('connecting to DB....');
      await super.connect();
      console.log('connection successfully');

      console.log();
      console.log('executing query...');
      const queryResponse = await this.dbConnection.execute(
        'SELECT COUNT(*) contador FROM TELMASTERLINES ML',
      );
      console.log(JSON.stringify(queryResponse));

      console.log();
      console.log('checkIp');
      const parameters = {
        i_ipsource: '10.50.10.5',
        o_expiredate: null,
        o_status: null,
      };
      const spResponse = await super.executeStoredProcedure(
        'boss_package',
        'GetIfRemoteInstallerIP',
        parameters,
      );
      console.log('response', spResponse);
      console.log('parameters', parameters);
      //   return {
      //     expireDate: spResponse.o_expiredate,
      //     status: spResponse.o_status,
      //   };
      return null;
    } catch (error) {
      console.log();
      console.log('ERROR >>');
      console.log(error);
      //   super.exceptionHandler(error, dto?.ip);
    } finally {
      await this.closeConnection();
    }
  }
}
