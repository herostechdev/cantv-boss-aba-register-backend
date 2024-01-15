import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { PayAbaInstallationRequestDto } from './pay-aba-installation-request.dto';
import { PayABAInstallationStatusConstants } from './pay-aba-installation-status.constants';
import { IPayABAInstallationResponse } from './pay-aba-installation-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class PayAbaInstallationRawService extends OracleExecuteStoredProcedureRawService<
  PayAbaInstallationRequestDto,
  IPayABAInstallationResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.PAY_ABA_INSTALLATION,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: PayAbaInstallationRequestDto): any {
    return {
      contractlogin: OracleHelper.stringBindIn(
        BossHelper.getAutomaticCustomerUserName(
          dto.areaCode,
          dto.phoneNumber,
          dto.customerIdentificationDocument,
        ),
      ),
      installerlogin: OracleHelper.stringBindIn(dto.installerLogin),

      status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(result: any): IPayABAInstallationResponse {
    return {
      status: (OracleHelper.getFirstItem(result, 'status') ??
        PayABAInstallationStatusConstants.ERROR) as PayABAInstallationStatusConstants,
    };
  }
}
