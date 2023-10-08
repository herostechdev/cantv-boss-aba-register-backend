import { Injectable } from '@nestjs/common';
import { CheckIpRequestDto } from './check-ip-request.dto';
import { DatabaseService } from 'src/system/infrastructure/services/database.service';
import { DataSource } from 'typeorm';
import { ICheckIpResponse } from './check-ip-response.interface';

@Injectable()
export class CheckIpService extends DatabaseService {
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource);
  }

  async checkIp(dto: CheckIpRequestDto): Promise<ICheckIpResponse> {
    try {
      const response = await super.executeStoredProcedure(
        'GetlfRemoteInstallerIP',
        [dto.ip],
      );
      return {
        expireDate: response.o_expiredate,
        status: response.o_status,
      };
    } catch (error) {
      super.exceptionHandler(error, dto?.ip);
    }
  }
}
