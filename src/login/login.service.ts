import { Injectable } from '@nestjs/common';
import { ILoginResponse } from './login-response.interface';
import { LoginRequestDto } from './login-request.dto';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle.constants';

@Injectable()
export class LoginService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async login(dto: LoginRequestDto): Promise<ILoginResponse> {
    try {
      await super.connect();
      const parameters = {
        i_ipsource: dto.username,
        o_expiredate: null,
        o_status: null,
      };
      const spResponse = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.LOGIN,
        parameters,
      );
      return {
        expireDate: parameters.o_expiredate,
        status: parameters.o_status,
      };
    } catch (error) {
      super.exceptionHandler(error, dto?.username);
    } finally {
      await this.closeConnection();
    }
  }
}
