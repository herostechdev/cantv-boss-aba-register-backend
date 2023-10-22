import { Injectable } from '@nestjs/common';
import { ClientExistsService } from 'src/client-exists/client-exists.service';
import { ClientExistsStatusConstants } from 'src/client-exists/client-exists-status.constants';
import { ConfirmRegistrationRequestDto } from './confirm-registration-request.dto';
import { ConfirmRegistrationData } from './confirm-registration-data';
import { IGetPlanABAFromKenanResponse } from './get-plan-aba-from-kenan/get-plan-aba-from-kenan-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConstants } from 'src/oracle/oracle.constants';

@Injectable()
export class ConfirmRegistrationService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    private readonly clientExistsService: ClientExistsService,
  ) {
    super(oracleConfigurationService);
  }

  async confirmRegistration(
    dto: ConfirmRegistrationRequestDto,
  ): Promise<ConfirmRegistrationData> {
    try {
      const data = new ConfirmRegistrationData();
      data.requestDto = dto;
      await super.connect();
      data.getPlanAbaFromKenanResponse = await this.getPlanAbaFromKenan(data);
      data.clientExistsResponse = await this.clientExistsService.clientExists(
        null,
        null,
      );
      if (
        data.clientExistsResponse.status ===
        ClientExistsStatusConstants.SUCCESSFULL
      ) {
        // CreateAndProvisionMasterAct
      } else {
        // CreateAndProvisionClient
      }
      return data;
    } catch (error) {
      super.exceptionHandler(error, `${dto?.areaCode} ${dto?.phoneNumber}`);
    } finally {
      await this.closeConnection();
    }
  }

  private async getPlanAbaFromKenan(
    data: ConfirmRegistrationData,
  ): Promise<IGetPlanABAFromKenanResponse> {
    const parameters = {
      abaplan: OracleHelper.stringBindIn(data.requestDto.abaPlan, 3),
      // TODO: Cómo obtener la respuesta de la ejecución del SP
      abaPlanCode: OracleHelper.stringBindOut(),
    };
    const result = await super.executeStoredProcedure(
      null,
      OracleConstants.GET_PLAN_ABA_FROM_KENAN,
      parameters,
    );
    const response: IGetPlanABAFromKenanResponse = {
      abaPlanCode: result?.outBinds?.abaPlanCode,
    };
    return response;
  }
}
