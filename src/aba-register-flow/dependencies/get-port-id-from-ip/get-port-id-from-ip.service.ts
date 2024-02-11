import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetPortIdFromIpBadIpFormatException } from 'src/raw/database/stored-procedures/get-port-id-from-ip/get-port-id-from-ip-bad-ip-format.exception';
import { GetPortIdFromIpExecutionException } from 'src/raw/database/stored-procedures/get-port-id-from-ip/get-port-id-from-ip-execution.exception';
import { GetPortIdFromIpRawService } from 'src/raw/database/stored-procedures/get-port-id-from-ip/get-port-id-from-ip-raw.service';
import { GetPortIdFromIpRequestDto } from 'src/raw/database/stored-procedures/get-port-id-from-ip/get-port-id-from-ip-request.dto';
import { GetPortIdFromIpStatusConstants } from 'src/raw/database/stored-procedures/get-port-id-from-ip/get-port-id-from-ip-status.constants';
import { IGetPortIdFromIpResponse } from 'src/raw/database/stored-procedures/get-port-id-from-ip/get-port-id-from-ip-response.interface';

@Injectable()
export class AbaRegisterGetPortIdFromIpService extends AbaRegisterExecuteService<
  GetPortIdFromIpRequestDto,
  IGetPortIdFromIpResponse
> {
  constructor(protected readonly rawService: GetPortIdFromIpRawService) {
    super(
      AbaRegisterGetPortIdFromIpService.name,
      'Obtener el ID del puerto a partir de la IP',
      rawService,
    );
  }

  protected processResponse(
    response: IGetPortIdFromIpResponse,
  ): IGetPortIdFromIpResponse {
    switch (response.status) {
      case GetPortIdFromIpStatusConstants.SUCCESSFULL:
        return response;
      case GetPortIdFromIpStatusConstants.ERROR:
        throw new GetPortIdFromIpExecutionException();
      case GetPortIdFromIpStatusConstants.DSLAM_DATA_NOT_FOUND_FOR_BOSS_PORT:
        return response;
      case GetPortIdFromIpStatusConstants.IP_FORMAT_ERROR:
        throw new GetPortIdFromIpBadIpFormatException();
      default:
        throw new GetPortIdFromIpExecutionException();
    }
  }
}
