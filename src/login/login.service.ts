import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './login-request.dto';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { LoginData } from './LOGIN-data';

@Injectable()
export class LoginService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async login(dto: LoginRequestDto): Promise<LoginData> {
    try {
      const data = new LoginData();
      data.requestDto = dto;
      await super.connect();
      data.getGroupAccessFromLoginResponse = await this.getGroupAccessFromLogin(
        data,
      );
      data.isgActionAllowedResponse = await this.isgActionAllowed(data);
      return data;
    } catch (error) {
      super.exceptionHandler(error, `${dto?.userlogin}`);
    } finally {
      await this.closeConnection();
    }
  }

  private async getGroupAccessFromLogin(
    data: LoginData,
  ): Promise<IGetGroupAccessFromLoginResponse> {
    try {
      await super.connect();
      const parameters = {
        userlogin: OracleHelper.stringBindIn(dto.userlogin),
        userpassword: OracleHelper.tableOfStringBindOut(56),
        accessgroup: OracleHelper.tableOfStringBindOut(56),
        status: OracleHelper.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.GET_IF_REMOTE_INSTALLER_IP,
        parameters,
      );
      const response = {
        expireDate: OracleHelper.getFirstItem(result, 'o_expiredate'),
        status: OracleHelper.getFirstItem(result, 'status'),
      };
      return response;
    } catch (error) {
      super.exceptionHandler(error, dto?.ipAddress);
    } finally {
      await this.closeConnection();
    }
  }

  private async isgActionAllowed(
    data: LoginData,
  ): Promise<IISGActionAllowedResponse> {
    try {
      await super.connect();
      const parameters = {
        groupname: OracleHelper.stringBindIn(data.groupName),
        action: OracleHelper.stringBindIn(data.action),
        status: OracleHelper.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.ISG_ACTION_ALLOWED,
        parameters,
      );
      const response = {
        expireDate: OracleHelper.getFirstItem(result, 'o_expiredate'),
        status: OracleHelper.getFirstItem(result, 'status'),
      };
      return response;
    } catch (error) {
      super.exceptionHandler(error, dto?.ipAddress);
    } finally {
      await this.closeConnection();
    }
  }
}
