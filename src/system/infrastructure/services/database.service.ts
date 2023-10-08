import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, SelectQueryBuilder } from 'typeorm';
import { CommonService } from './common.service';
import { InvalidStoredProcedureDefinitionException } from '../exceptions/invalid-stored-procedure-definition.exception';
import { IOrderBy } from './order-by.interface';

@Injectable()
export class DatabaseService extends CommonService {
  constructor(protected readonly dataSource: DataSource) {
    super();
  }

  protected executeStoredProcedure(
    query: string,
    parameters?: any[],
    entityManager?: EntityManager,
  ): Promise<any> {
    if (entityManager) {
      return entityManager.query(`CALL ${query}`, parameters);
    }
    return this.dataSource.query(`CALL ${query}`, parameters);
  }

  public async storedProcedureSanitizer(
    databaseName: string,
    storedProcedureName: string,
  ): Promise<void> {
    try {
      const response = await this.getStoredProcedureDefinition(
        databaseName,
        storedProcedureName,
      );
      this.validateStoredProcedureDefinitionResponse(
        databaseName,
        storedProcedureName,
        response,
      );
      const regEx = /[CREATE|ALTER|INSERT|DELETE|DROP]+/gi;
      if (regEx.test(response[0].ROUTINE_DEFINITION.toString())) {
        throw new InvalidStoredProcedureDefinitionException(
          storedProcedureName,
        );
      }
    } catch (error) {
      throw new InvalidStoredProcedureDefinitionException(
        storedProcedureName,
        error,
      );
    }
  }

  private getStoredProcedureDefinition(
    databaseName: string,
    storedProcedureName: string,
  ): Promise<any> {
    const query = `SELECT ROUTINE_DEFINITION FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA = '${databaseName}' AND ROUTINE_TYPE = 'PROCEDURE' AND ROUTINE_NAME = '${storedProcedureName}';`;
    return this.dataSource.query(query);
  }

  private validateStoredProcedureDefinitionResponse(
    databaseName: string,
    storedProcedureName: string,
    response: any,
  ): void {
    if (
      Array.isArray(response) &&
      response.length > 0 &&
      response[0].hasOwnProperty('ROUTINE_DEFINITION') &&
      response[0].ROUTINE_DEFINITION
    ) {
      return;
    }
    throw new InvalidStoredProcedureDefinitionException(storedProcedureName);
  }

  protected setOrderBy<T>(
    query: SelectQueryBuilder<T>,
    orders: IOrderBy[],
  ): void {
    if (!query || !Array.isArray(orders)) return;
    orders.forEach((o) => query.addOrderBy(o.field, o.orderType));
  }
}
