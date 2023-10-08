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
      console.log('connect to DB....');
      super.connect();
      console.log();
      console.log();
      console.log();
      console.log('checkIp');
      const response = await super.executeStoredProcedure(
        'boss_package',
        'GetIfRemoteInstallerIP',
        [dto.ip],
      );
      console.log('response', response);
      return {
        expireDate: response.o_expiredate,
        status: response.o_status,
      };
    } catch (error) {
      console.log('error', error);
      super.exceptionHandler(error, dto?.ip);
    }
  }
}
