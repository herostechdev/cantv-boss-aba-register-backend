import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { AbaRegisterGetGroupAccessFromLoginService } from './aba-register-get-group-access-from-login.service';
import { AbaRegisterISGActionAllowedService } from './aba-register-isg-action-allowed.service';
import { AbaRegisterLoginData } from './aba-register-login-data';
import { AbaRegisterLoginRequestDto } from './aba-register-login-request.dto';
import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { HashService } from 'src/system/infrastructure/security/encryption/hash.service';
import { IAbaRegisterLoginResponse } from './aba-register-login-response.interface';
import { InvalidPasswordException } from 'src/exceptions/invalid-password.exception';
import { OracleFinalExecuteService } from 'src/oracle/oracle-final-execute.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterLoginService extends OracleFinalExecuteService<
  AbaRegisterLoginRequestDto,
  void
> {
  constructor(
    private readonly abaRegisterGetGroupAccessFromLoginService: AbaRegisterGetGroupAccessFromLoginService,
    private readonly hashService: HashService,
    private readonly abaRegisterISGActionAllowedService: AbaRegisterISGActionAllowedService,
  ) {
    super();
  }

  async execute(
    dto: AbaRegisterLoginRequestDto,
    dbConnection?: Connection,
  ): Promise<void> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.START,
        input: JSON.stringify(dto),
        clazz: AbaRegisterLoginService.name,
        method: BossConstants.EXECUTE,
      });
      const data = new AbaRegisterLoginData();
      data.requestDto = dto;
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Obtener permisología del usuario',
        input: JSON.stringify(dto),
        clazz: AbaRegisterLoginService.name,
        method: BossConstants.EXECUTE,
      });
      data.getGroupAccessFromLoginResponse =
        await this.abaRegisterGetGroupAccessFromLoginService.execute(
          dto,
          dbConnection,
        );
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Validar contraseña',
        input: dto.userlogin,
        clazz: AbaRegisterLoginService.name,
        method: BossConstants.EXECUTE,
      });
      this.validatePassword(
        dto.password,
        data.getGroupAccessFromLoginResponse?.password,
      );
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Validar permisos',
        input: dto.userlogin,
        clazz: AbaRegisterLoginService.name,
        method: BossConstants.EXECUTE,
      });
      data.isgActionAllowedResponse =
        await this.abaRegisterISGActionAllowedService.execute({
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
          groupName: data.getGroupAccessFromLoginResponse.accessGroup,
          action: BossConstants.INSTALL_ABA,
        });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.END,
        input: JSON.stringify(dto),
        clazz: AbaRegisterLoginService.name,
        method: BossConstants.EXECUTE,
      });
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterLoginService.name,
        method: BossConstants.EXECUTE,
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
  }

  private validatePassword(password: string, storedPassword: string): void {
    console.log();
    console.log('validatePassword');
    console.log();
    console.log('    password', password);
    console.log('    storedPassword', storedPassword);

    // console.log();
    // const hashedPassword = this.hashService.hashing(password);
    // console.log('    hashedPassword', hashedPassword);

    console.log();
    const md5Password = this.hashService.md5(password);
    console.log('    md5Password', md5Password);

    // console.log();
    // const md5Base64Password = this.hashService.md5Base64(password);
    // console.log('    md5Base64Password', md5Base64Password);

    // console.log();
    // const md5HexPassword = this.hashService.md5Hex(password);
    // console.log('    md5HexPassword', md5HexPassword);

    console.log();
    console.log(
      '    isMatch',
      this.hashService.verifyMd5(password, storedPassword),
    );
    if (!this.hashService.verifyMd5(password, storedPassword)) {
      throw new InvalidPasswordException();
    }
  }

  protected processResponse(response: void): IAbaRegisterLoginResponse {
    return;
  }
}
