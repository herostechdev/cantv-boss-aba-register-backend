import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
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
    protected readonly updateDslAbaRegistersRawService: UpdateDslAbaRegistersRawService,
  ) {
    super(oracleConfigurationService, updateDslAbaRegistersRawService);
    // super.className = AbaRegisterLoginService.name;
    // super.methodName = BossConstants.EXECUTE_METHOD;
    this.wlog.className = AbaRegisterLoginService.name;
    this.wlog.methodName = BossConstants.EXECUTE_METHOD;
  }

  async execute(
    dto: AbaRegisterLoginRequestDto,
  ): Promise<IAbaRegisterLoginResponse> {
    this.wlog.info(BossConstants.START);
    this.initialize(dto);
    const dbConnection = await super.connect();
    try {
      await this.getGroupAccessFromLogin(dbConnection);
      this.validatePassword();
      await this.isgActionAllowed(dbConnection);
      this.wlog.info(BossConstants.END);
      return this.response;
    } catch (error) {
      this.wlog.error(error);
      super.exceptionHandler(error, JSON.stringify(dto));
    } finally {
      await this.closeConnection(dbConnection, true);
    }
  }

  private initialize(dto: AbaRegisterLoginRequestDto): void {
    this.dto = dto;
    this.response = {
      getGroupAccessFromLoginResponse: null,
      isgActionAllowedResponse: null,
    };
  }

  private async getGroupAccessFromLogin(
    dbConnection: Connection,
  ): Promise<void> {
    this.wlog.info('Obtener permisología del usuario');
    this.response.getGroupAccessFromLoginResponse =
      await this.abaRegisterGetGroupAccessFromLoginService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          userlogin: this.dto.userlogin,
        },
        dbConnection,
      );
  }

  private validatePassword(): void {
    this.wlog.info('Validar credenciales');
    if (
      !this.hashService.verifyMd5(
        this.dto.password,
        this.response.getGroupAccessFromLoginResponse.password,
      )
    ) {
      throw new InvalidPasswordException();
    }
  }

  private async isgActionAllowed(dbConnection: Connection): Promise<void> {
    this.wlog.info('Validar permisos');
    this.response.isgActionAllowedResponse =
      await this.abaRegisterISGActionAllowedService.execute(
        {
          areaCode: this.dto.areaCode,
          phoneNumber: this.dto.phoneNumber,
          action: BossConstants.INSTALL_ABA,
          groupName: this.response.getGroupAccessFromLoginResponse.accessGroup,
        },
        dbConnection,
      );
  }
}
