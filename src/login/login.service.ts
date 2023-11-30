import { Injectable } from '@nestjs/common';
import { GetGroupAccessFromLoginInternalErrorException } from './get-group-access-from-login/get-group-access-from-login-internal-error.exception';
import { GetGroupAccessFromLoginThereIsNoDataException } from './get-group-access-from-login/get-group-access-from-login-there-is-no-data.exception';
import { GetGroupAccessFromLoginNotFoundException } from './get-group-access-from-login/get-group-access-from-login-not-found.exception';
import { HashService } from 'src/system/infrastructure/security/encryption/hash.service';
import { IGetGroupAccessFromLoginResponse } from './isg-action-allowed/isg-action-allowed-response.interface';
import { IISGActionAllowedResponse } from './get-group-access-from-login/get-group-access-from-login-response.interface';
import { ILoginResponse } from './login-response.interface';
import { InvalidPasswordException } from './invalid-password.exception';
import { ISGActionAllowedException } from './isg-action-allowed/isg-action-allowed.exception';
import { ISGActionAllowedThereIsNoDataException } from './isg-action-allowed/isg-action-allowed-there-is-no-data.exception';
import {
  LoginActionStausConstants,
  LoginStatusConstants,
} from './login.constans';
import { LoginData } from './LOGIN-data';
import { LoginRequestDto } from './login-request.dto';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class LoginService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly hashService: HashService,
  ) {
    super(oracleConfigurationService);
  }

  async login(dto: LoginRequestDto): Promise<ILoginResponse> {
    try {
      Wlog.instance.info({
        message: 'Inicio',
        bindingData: dto.userlogin,
        clazz: LoginService.name,
        method: 'login',
      });
      const data = new LoginData();
      data.requestDto = dto;
      await super.connect();
      Wlog.instance.info({
        message: 'Obtener permisología del usuario',
        bindingData: dto.userlogin,
        clazz: LoginService.name,
        method: 'login',
      });
      data.getGroupAccessFromLoginResponse = await this.getGroupAccessFromLogin(
        data,
      );
      Wlog.instance.info({
        message: 'Validar contraseña',
        bindingData: dto.userlogin,
        clazz: LoginService.name,
        method: 'login',
      });
      this.validatePassword(
        dto.password,
        data.getGroupAccessFromLoginResponse?.userpassword,
      );
      Wlog.instance.info({
        message: 'Validar permisos',
        bindingData: dto.userlogin,
        clazz: LoginService.name,
        method: 'login',
      });
      data.isgActionAllowedResponse = await this.isgActionAllowed(data);
      return {
        status: data.isgActionAllowedResponse?.status,
      };
    } catch (error) {
      Wlog.instance.error({
        message: error?.message,
        bindingData: dto.userlogin,
        clazz: LoginService.name,
        method: 'login',
        error: error,
        stack: error?.stack,
      });
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
        userpassword: OracleHelper.tableOfStringBindOut(),
        accessgroup: OracleHelper.tableOfStringBindOut(),
        status: OracleHelper.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        BossConstants.SIGS_PACKAGE,
        BossConstants.GET_GROUP_ACCESS_FROM_LOGIN,
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
          throw new GetGroupAccessFromLoginInternalErrorException(result);
        case LoginStatusConstants.THERE_IS_NO_DATA:
          throw new GetGroupAccessFromLoginThereIsNoDataException();
        case LoginStatusConstants.NOT_FOUND:
          throw new GetGroupAccessFromLoginNotFoundException();
        default:
          throw new GetGroupAccessFromLoginInternalErrorException();
      }
    } catch (error) {
      super.exceptionHandler(error, data?.requestDto.userlogin);
    }
  }

  //TODO: Validar si el password es correcto: data.getGroupAccessFromLoginResponse.userpassword. Validar con Ivan validación MD5
  private validatePassword(password: string, storedPassword: string): void {
    console.log();
    console.log('validatePassword');
    console.log();
    console.log('\tpassword', password);
    console.log('    storedPassword', storedPassword);

    console.log();
    const hashedPassword = this.hashService.hashing(password);
    console.log('    hashedPassword', hashedPassword);

    console.log();
    const md5Password = this.hashService.md5(password);
    console.log('    md5Password', md5Password);

    console.log();
    const md5Base64Password = this.hashService.md5Base64(password);
    console.log('    md5Base64Password', md5Base64Password);

    console.log();
    const md5HexPassword = this.hashService.md5Hex(password);
    console.log('    md5HexPassword', md5HexPassword);

    console.log();
    console.log(
      '    isMatch',
      this.hashService.isMatch(password, storedPassword),
    );
    if (!this.hashService.isMatch(password, storedPassword)) {
      throw new InvalidPasswordException();
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
        action: OracleHelper.stringBindIn(BossConstants.INSTALL_ABA),
        status: OracleHelper.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        BossConstants.SIGS_PACKAGE,
        BossConstants.ISG_ACTION_ALLOWED,
        parameters,
      );
      const response = {
        status: OracleHelper.getFirstItem(result, 'status'),
      };
      switch (response.status) {
        case LoginActionStausConstants.SUCCESSFULL:
          return response;
        case LoginActionStausConstants.INTERNAL_ERROR:
          throw new ISGActionAllowedException(result);
        case LoginActionStausConstants.THERE_IS_NO_DATA:
          throw new ISGActionAllowedThereIsNoDataException();
        default:
          throw new ISGActionAllowedException();
      }
    } catch (error) {
      super.exceptionHandler(error, data?.requestDto.userlogin);
    }
  }
}
