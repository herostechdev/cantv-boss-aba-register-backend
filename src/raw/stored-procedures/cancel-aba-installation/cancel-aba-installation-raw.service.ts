import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { CancelAbaInstallationRequestDto } from './cancel-aba-installation-request.dto';
import { CancelABAInstallationStatusConstants } from './cancel-aba-installation-status.constants';
import { ICancelABAInstallationResponse } from './cancel-aba-installation-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class CancelAbaInstallationRawService extends OracleExecuteStoredProcedureRawService<
  CancelAbaInstallationRequestDto,
  ICancelABAInstallationResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.CANCEL_ABA_INSTALLATION,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: CancelAbaInstallationRequestDto): any {
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

  protected getResponse(result: any): ICancelABAInstallationResponse {
    return {
      status: (OracleHelper.getFirstItem(result, 'status') ??
        CancelABAInstallationStatusConstants.ERROR) as CancelABAInstallationStatusConstants,
    };
  }
}
