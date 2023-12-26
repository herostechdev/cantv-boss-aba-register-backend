import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { GetGroupAccessFromLoginException } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login.exception';
import { GetGroupAccessFromLoginNotFoundException } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-not-found.exception';
import { GetGroupAccessFromLoginRawService } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-raw.service';
import { GetGroupAccessFromLoginRequestDto } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-request.dto';
import { GetGroupAccessFromLoginStatusConstants } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-status.constants';
import { GetGroupAccessFromLoginThereIsNoDataException } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-there-is-no-data.exception';
import { IGetGroupAccessFromLoginResponse } from 'src/raw/stored-procedures/get-group-access-from-login/get-group-access-from-login-response.interface';
import { IOracleExecute } from 'src/oracle/oracle-execute.interface';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterGetGroupAccessFromLoginService
  extends CommonService
  implements
    IOracleExecute<
      GetGroupAccessFromLoginRequestDto,
      IGetGroupAccessFromLoginResponse
    >
{
  constructor(
    private readonly getGroupAccessFromLoginRawService: GetGroupAccessFromLoginRawService,
  ) {
    super();
  }

  async execute(
    dto: GetGroupAccessFromLoginRequestDto,
    dbConnection?: Connection,
  ): Promise<IGetGroupAccessFromLoginResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetGroupAccessFromLoginService.name,
        method: 'execute',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Obtiene la informacón del grupo de acceso del usuario',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetGroupAccessFromLoginService.name,
        method: 'execute',
      });
      const response = await this.getGroupAccessFromLoginRawService.execute(
        dto,
        dbConnection,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetGroupAccessFromLoginService.name,
        method: 'execute',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterGetGroupAccessFromLoginService.name,
        method: 'execute',
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
  }

  processResponse(
    response: IGetGroupAccessFromLoginResponse,
  ): IGetGroupAccessFromLoginResponse {
    switch (response.status) {
      case GetGroupAccessFromLoginStatusConstants.SUCCESSFULL:
        return response;
      case GetGroupAccessFromLoginStatusConstants.ERROR:
        throw new GetGroupAccessFromLoginException();
      case GetGroupAccessFromLoginStatusConstants.THERE_IS_NO_DATA:
        throw new GetGroupAccessFromLoginThereIsNoDataException();
      case GetGroupAccessFromLoginStatusConstants.USERNAME_DOES_NOT_EXIST:
        throw new GetGroupAccessFromLoginNotFoundException();
      default:
        throw new GetGroupAccessFromLoginException();
    }
  }
}
