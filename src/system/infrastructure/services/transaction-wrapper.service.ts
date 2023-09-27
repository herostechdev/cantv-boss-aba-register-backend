import { DataSource, QueryRunner } from 'typeorm';
import { CommonService } from './common.service';
import { InputIsNotDefinedException } from '../exceptions/input-is-not-defined.exception';
// import { LogsService } from '../loggers/logs.service';
import { ValidationHelper } from '../helpers/validation.helper';

export abstract class TransactionWrapperService<
  INPUT,
  OUTPUT,
> extends CommonService {
  constructor(
    protected readonly dataSource: DataSource, // protected readonly logService: LogsService,
  ) {
    super();
    // logService.context = TransactionWraperService.name;
  }

  async run(input: INPUT, queryRunner?: QueryRunner): Promise<OUTPUT> {
    const createTransaction = !queryRunner;
    try {
      queryRunner = this.getQueryRunner(createTransaction, queryRunner);
      await this.connect(createTransaction, queryRunner);
      await this.startTransaction(createTransaction, queryRunner);
      await this.validate(queryRunner, input);
      const result = await this.customTransactionProcess(queryRunner, input);
      await this.commitTransaction(createTransaction, queryRunner);
      return result;
    } catch (error) {
      await this.rollbackTransaction(createTransaction, queryRunner);
      super.exceptionHandler(error, JSON.stringify(input));
    } finally {
      await this.release(createTransaction, queryRunner);
    }
  }

  private getQueryRunner(
    createTransaction: boolean,
    queryRunner?: QueryRunner,
  ): QueryRunner {
    return createTransaction === true
      ? this.dataSource.createQueryRunner()
      : queryRunner;
  }

  private connect(
    createTransaction: boolean,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    if (!createTransaction) return;
    queryRunner.connect();
  }

  private startTransaction(
    createTransaction: boolean,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    if (!createTransaction) {
      return;
    }
    return queryRunner.startTransaction('SERIALIZABLE');
  }

  private isLocalTransaction(
    createTransaction: boolean,
    queryRunner?: QueryRunner,
  ): boolean {
    return (
      createTransaction === true && ValidationHelper.isDefined(queryRunner)
    );
  }

  private commitTransaction(
    createTransaction: boolean,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    if (!this.isLocalTransaction(createTransaction, queryRunner)) {
      return;
    }
    return queryRunner.commitTransaction();
  }

  private rollbackTransaction(
    createTransaction: boolean,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    if (!this.isLocalTransaction(createTransaction, queryRunner)) {
      return;
    }
    return queryRunner.rollbackTransaction();
  }

  private release(
    createTransaction: boolean,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    if (!this.isLocalTransaction(createTransaction, queryRunner)) {
      return;
    }
    queryRunner.release();
  }

  private validate(queryRunner: QueryRunner, input: INPUT): Promise<void> {
    if (!ValidationHelper.isDefined(input))
      throw new InputIsNotDefinedException();
    return this.validateInput(queryRunner, input);
  }

  protected abstract validateInput(
    queryRunner: QueryRunner,
    input: INPUT,
  ): Promise<void>;

  protected abstract customTransactionProcess(
    queryRunner: QueryRunner,
    input: INPUT,
  ): Promise<OUTPUT>;
}
