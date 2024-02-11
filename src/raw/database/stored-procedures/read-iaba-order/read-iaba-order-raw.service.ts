import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { BossConstants } from 'src/boss/boss.constants';
import { IReadIABAOrderResponse } from './read-iaba-order-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { ReadIABAOrderRequestDto } from './read-iaba-order-request.dto';
import { ReadIABAOrderStatusConstants } from './read-iaba-order-status.constants';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class ReadIABAOrderRawService extends OracleExecuteStoredProcedureRawService<
  ReadIABAOrderRequestDto,
  IReadIABAOrderResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.UTL_PACKAGE,
      BossConstants.READ_IABA_ORDER,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: ReadIABAOrderRequestDto): any {
    return {
      sz_ncc: OracleHelper.stringBindIn(
        this.getValue(dto.orderIsAtBoss, dto.ncc, BossConstants.ZEROS_10),
      ),
      sz_areacode: OracleHelper.stringBindIn(dto.areaCode),
      sz_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber),
      orderid: OracleHelper.stringBindIn(dto.orderId),
      sz_clienttype: OracleHelper.stringBindIn(dto.customerType),
      sz_orderdate: OracleHelper.dateBindIn(this.getOrderDate(dto.orderDate)),
      sz_rack: OracleHelper.stringBindIn(dto.rack),
      sz_position: OracleHelper.stringBindIn(dto.position),
      n_dslamslot: OracleHelper.numberBindIn(dto.dslamSlot),
      n_port: OracleHelper.numberBindIn(dto.port),
      sz_ad: OracleHelper.stringBindIn(dto.ad),
      sz_adpair: OracleHelper.stringBindIn(dto.adPair),
      sz_office: OracleHelper.stringBindIn(null, 10),
      sz_createdby: OracleHelper.stringBindIn(null, 8),
      sz_provider: OracleHelper.stringBindIn(dto.provider),
      sz_room: OracleHelper.stringBindIn(dto.room, 32),
      // n_recursive: OracleHelper.numberBindIn(dto.recursive),
      sz_sistema: OracleHelper.stringBindIn(dto.system),
      iCoid: OracleHelper.stringBindIn(dto.centralPortId),
      i_executiondate: OracleHelper.stringBindIn(dto.executionDate),
      i_autoinstall: OracleHelper.numberBindIn(dto.isAutoInstallation),

      l_errorcode: OracleHelper.tableOfNumberBindOut(),
    };
  }

  private getOrderDate(orderDate: string): Date {
    const dateTimeOrderDate = orderDate
      ? DateTime.fromFormat(orderDate, BossConstants.DEFAULT_DATE_FORMAT)
      : DateTime.now();
    return dateTimeOrderDate.isValid ? dateTimeOrderDate.toJSDate() : null;
  }

  private getValue<T>(orderIsAtBoss: boolean, value: T, elseValue: T): T {
    return orderIsAtBoss ? value : elseValue;
  }

  protected getResponse(result: any): IReadIABAOrderResponse {
    return {
      status: (result?.outBinds?.o_status ??
        ReadIABAOrderStatusConstants.GENERAL_DATABASE_ERROR) as ReadIABAOrderStatusConstants,
    };
  }
}
