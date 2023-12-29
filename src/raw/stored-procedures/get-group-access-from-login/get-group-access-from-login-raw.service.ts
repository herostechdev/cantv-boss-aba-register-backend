import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { GetGroupAccessFromLoginRequestDto } from './get-group-access-from-login-request.dto';
import { GetGroupAccessFromLoginStatusConstants } from './get-group-access-from-login-status.constants';
import { IGetGroupAccessFromLoginResponse } from './get-group-access-from-login-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetGroupAccessFromLoginRawService extends OracleExecuteStoredProcedureRawService<
  GetGroupAccessFromLoginRequestDto,
  IGetGroupAccessFromLoginResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.SIGS_PACKAGE,
      BossConstants.GET_GROUP_ACCESS_FROM_LOGIN,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  // async execute(
  //   dto: GetGroupAccessFromLoginRequestDto,
  //   dbConnection?: Connection,
  // ): Promise<IGetGroupAccessFromLoginResponse> {
  //   try {
  //     await super.connect(dbConnection);
  //     const result = await super.executeStoredProcedure(
  //       BossConstants.SIGS_PACKAGE,
  //       BossConstants.GET_GROUP_ACCESS_FROM_LOGIN,
  //       this.getParameters(dto),
  //     );
  //     return this.getResponse(result);
  //   } catch (error) {
  //     super.exceptionHandler(error, dto);
  //   } finally {
  //     await super.closeConnection(dbConnection !== null);
  //   }
  // }

  getParameters(dto: GetGroupAccessFromLoginRequestDto): any {
    return {
      userlogin: OracleHelper.stringBindIn(dto.userlogin),

      userpassword: OracleHelper.tableOfStringBindOut(),
      accessgroup: OracleHelper.tableOfStringBindOut(),
      status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  getResponse(result: any): IGetGroupAccessFromLoginResponse {
    return {
      password: result?.outBinds?.userpassword,
      accessGroup: result?.outBinds?.accessgroup,
      status: (OracleHelper.getFirstItem(result, 'status') ??
        GetGroupAccessFromLoginStatusConstants.ERROR) as GetGroupAccessFromLoginStatusConstants,
    };
  }
}
