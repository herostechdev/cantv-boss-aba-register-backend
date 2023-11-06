import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './login-request.dto';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { LoginData } from './LOGIN-data';
import { IISGActionAllowedResponse } from './get-group-access-from-login-response.interface';
import { LoginActionConstants, LoginStatusConstants } from './login.constans';
import { GetGroupAccessFromLoginInternalErrorException } from './get-group-access-from-login-internal-error.exception';
import { GetGroupAccessFromLoginThereIsNoDataException } from './get-group-access-from-login-there-is-no-data.exception';
import { GetGroupAccessFromLoginNotFoundException } from './get-group-access-from-login-not-found.exception';
import { IGetGroupAccessFromLoginResponse } from './isg-action-allowed-response.interface';
import { ILoginResponse } from './login-response.interface';

@Injectable()
export class LoginService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async login(dto: LoginRequestDto): Promise<ILoginResponse> {
    try {
      const data = new LoginData();
      data.requestDto = dto;
      await super.connect();
      data.getGroupAccessFromLoginResponse = await this.getGroupAccessFromLogin(
        data,
      );
      //TODO: Validar si el password es correcto: data.getGroupAccessFromLoginResponse.userpassword
      //TODO: No correcto: Error Correcto: Continua
      //Valida si el usuario tiene permisos para Instalar ABA
      data.isgActionAllowedResponse = await this.isgActionAllowed(data);
      //TODO: Validar que data va en expireDate
      //TODO: El campo status estaba string en ILoginResponse y lo cambie a number
      return {
        status: data.isgActionAllowedResponse.status,
        expireDate: '2023/12//12',
      };
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
        userlogin: OracleHelper.stringBindIn(data.requestDto.userlogin),
        userpassword: OracleHelper.tableOfStringBindOut(56),
        accessgroup: OracleHelper.tableOfStringBindOut(56),
        status: OracleHelper.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.GET_IF_REMOTE_INSTALLER_IP,
        parameters,
      );
      const response: IGetGroupAccessFromLoginResponse = {
        userpassword: result?.outBinds?.userpassword,
        accessgroup: result?.outBinds?.accessgroup,
        status: (OracleHelper.getFirstItem(result, 'status') ??
          LoginStatusConstants.INTERNAL_ERROR) as LoginStatusConstants,
      };
      switch (response.status) {
        case LoginStatusConstants.SUCCESSFULL:
          return response;
        case LoginStatusConstants.INTERNAL_ERROR:
          throw new GetGroupAccessFromLoginInternalErrorException();
        case LoginStatusConstants.THERE_IS_NO_DATA:
          throw new GetGroupAccessFromLoginThereIsNoDataException();
        case LoginStatusConstants.NOT_FOUND:
          throw new GetGroupAccessFromLoginNotFoundException();
        default:
          throw new GetGroupAccessFromLoginInternalErrorException();
      }
    } catch (error) {
      super.exceptionHandler(error, data?.requestDto.userlogin);
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
        groupname: OracleHelper.stringBindIn(
          data.getGroupAccessFromLoginResponse.accessgroup,
        ),
        action: OracleHelper.stringBindIn(LoginActionConstants.INSTALAR_ABA),
        status: OracleHelper.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.ISG_ACTION_ALLOWED,
        parameters,
      );
      const response = {
        status: OracleHelper.getFirstItem(result, 'status'),
      };
      switch (response.status) {
        case LoginStatusConstants.SUCCESSFULL:
          return response;
        case LoginStatusConstants.INTERNAL_ERROR:
          throw new GetGroupAccessFromLoginInternalErrorException();
        case LoginStatusConstants.THERE_IS_NO_DATA:
          throw new GetGroupAccessFromLoginThereIsNoDataException();
        default:
          throw new GetGroupAccessFromLoginInternalErrorException();
      }
    } catch (error) {
      super.exceptionHandler(error, data?.requestDto.userlogin);
    } finally {
      await this.closeConnection();
    }
  }
}
