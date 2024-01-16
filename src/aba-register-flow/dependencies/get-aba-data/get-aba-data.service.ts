import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetAbaDataConstants } from 'src/raw/stored-procedures/get-aba-data/get-aba-data.constants';
import { GetABADataException } from 'src/raw/stored-procedures/get-aba-data/get-aba-data.exception';
import { GetAbaDataRawService } from 'src/raw/stored-procedures/get-aba-data/get-aba-data-raw.service';
import { GetAbaDataRequestDto } from 'src/raw/stored-procedures/get-aba-data/get-aba-data-request.dto';
import { IGetAbaDataResponse } from 'src/raw/stored-procedures/get-aba-data/get-aba-data-response.interface';

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
      case GetAbaDataConstants.SUCCESSFULL:
        return response;
      case GetAbaDataConstants.ERROR:
        throw new GetABADataException();
      case GetAbaDataConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetABADataException();
    }
  }
}
