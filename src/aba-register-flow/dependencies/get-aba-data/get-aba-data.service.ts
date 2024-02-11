import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetAbaDataRawService } from 'src/raw/database/stored-procedures/get-aba-data/get-aba-data-raw.service';
import { GetAbaDataRequestDto } from 'src/raw/database/stored-procedures/get-aba-data/get-aba-data-request.dto';
import { GetAbaDataStatusConstants } from 'src/raw/database/stored-procedures/get-aba-data/get-aba-data-status.constants';
import { GetABADataException } from 'src/raw/database/stored-procedures/get-aba-data/get-aba-data.exception';
import { IGetAbaDataResponse } from 'src/raw/database/stored-procedures/get-aba-data/get-aba-data-response.interface';

@Injectable()
export class AbaRegisterGetAbaDataService extends AbaRegisterExecuteService<
  GetAbaDataRequestDto,
  IGetAbaDataResponse
> {
  constructor(protected readonly rawService: GetAbaDataRawService) {
    super(
      AbaRegisterGetAbaDataService.name,
      'Obteniendo datos ABA',
      rawService,
    );
  }

  protected processResponse(
    response: IGetAbaDataResponse,
  ): IGetAbaDataResponse {
    switch (response.status) {
      case GetAbaDataStatusConstants.SUCCESSFULL:
        return response;
      case GetAbaDataStatusConstants.ERROR:
        throw new GetABADataException();
      case GetAbaDataStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetABADataException();
    }
  }
}
