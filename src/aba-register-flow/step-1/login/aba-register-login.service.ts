import { Injectable } from '@nestjs/common';
import { AbaRegisterGetGroupAccessFromLoginService } from './aba-register-get-group-access-from-login.service';
import { AbaRegisterISGActionAllowedService } from './aba-register-isg-action-allowed.service';
import { AbaRegisterLoginRequestDto } from './aba-register-login-request.dto';
import { BossConstants } from 'src/boss/boss.constants';
import { BossFlowService } from 'src/boss-flows/boss-flow.service';
import { HashService } from 'src/system/infrastructure/security/encryption/hash.service';
import { IAbaRegisterLoginResponse } from './aba-register-login-response.interface';
import { InvalidPasswordException } from 'src/exceptions/invalid-password.exception';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class AbaRegisterLoginService extends BossFlowService<
  AbaRegisterLoginRequestDto,
  IAbaRegisterLoginResponse
> {
  constructor(
    private readonly abaRegisterGetGroupAccessFromLoginService: AbaRegisterGetGroupAccessFromLoginService,
    private readonly abaRegisterISGActionAllowedService: AbaRegisterISGActionAllowedService,
    private readonly hashService: HashService,
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService, updateDslAbaRegistersRawService);
    super.className = AbaRegisterLoginService.name;
    super.methodName = BossConstants.EXECUTE_METHOD;
  }

  async execute(
    dto: AbaRegisterLoginRequestDto,
  ): Promise<IAbaRegisterLoginResponse> {
    this.initialize(dto);
    try {
      super.infoLog(BossConstants.START);
      await super.connect();

      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'Obtener permisología del usuario',
      //   input: JSON.stringify(dto),
      //   clazz: AbaRegisterLoginService.name,
      //   method: BossConstants.EXECUTE_METHOD,
      // });
      // this.response.getGroupAccessFromLoginResponse =
      //   await this.abaRegisterGetGroupAccessFromLoginService.execute(
      //     dto,
      //     this.dbConnection,
      //   );
      await this.getGroupAccessFromLogin();
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'Validar contraseña',
      //   input: dto.userlogin,
      //   clazz: AbaRegisterLoginService.name,
      //   method: BossConstants.EXECUTE_METHOD,
      // });
      // this.validatePassword(
      //   dto.password,
      //   data.getGroupAccessFromLoginResponse?.password,
      // );
      this.validatePassword();
      // Wlog.instance.info({
      //   phoneNumber: BossHelper.getPhoneNumber(dto),
      //   message: 'Validar permisos',
      //   input: dto.userlogin,
      //   clazz: AbaRegisterLoginService.name,
      //   method: BossConstants.EXECUTE_METHOD,
      // });
      // data.isgActionAllowedResponse =
      //   await this.abaRegisterISGActionAllowedService.execute({
      //     areaCode: dto.areaCode,
      //     phoneNumber: dto.phoneNumber,
      //     groupName: data.getGroupAccessFromLoginResponse.accessGroup,
      //     action: BossConstants.INSTALL_ABA,
      //   });
      await this.isgActionAllowed();
      super.infoLog(BossConstants.END);
      return this.response;
    } catch (error) {
      super.errorLog(error);
      super.exceptionHandler(error, JSON.stringify(dto));
    } finally {
      await this.closeConnection();
    }
  }

  private initialize(dto: AbaRegisterLoginRequestDto): void {
    this.dto = dto;
    this.response = {
      getGroupAccessFromLoginResponse: null,
      isgActionAllowedResponse: null,
    };
  }

  private async getGroupAccessFromLogin(): Promise<void> {
    super.infoLog('Obtener permisología del usuario');
    this.response.getGroupAccessFromLoginResponse =
      await this.abaRegisterGetGroupAccessFromLoginService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          userlogin: this.dto.userlogin,
        },
        this.dbConnection,
      );
  }

  private validatePassword(): void {
    super.infoLog('Validar credenciales');
    if (
      !this.hashService.verifyMd5(
        this.dto.password,
        this.response.getGroupAccessFromLoginResponse.password,
      )
    ) {
      throw new InvalidPasswordException();
    }
  }

  private async isgActionAllowed(): Promise<void> {
    super.infoLog('Validar permisos');
    this.response.isgActionAllowedResponse =
      await this.abaRegisterISGActionAllowedService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          action: BossConstants.INSTALL_ABA,
          groupName: this.response.getGroupAccessFromLoginResponse.accessGroup,
        },
        this.dbConnection,
      );
  }
}
