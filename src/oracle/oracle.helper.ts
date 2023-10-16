import { IsDate } from 'class-validator';
import {
  BindParameters,
  BIND_IN,
  STRING,
  NUMBER,
  BIND_OUT,
  DB_TYPE_VARCHAR,
  DB_TYPE_NUMBER,
  DB_TYPE_DATE,
} from 'oracledb';
import { ArrayHelper } from 'src/system/infrastructure/helpers/array.helper';

export class OracleHelper {
  public static stringBindIn(
    value: string,
    maxSize: number = undefined,
  ): BindParameters {
    return {
      val: value,
      type: STRING,
      maxSize: maxSize,
      dir: BIND_IN,
    };
  }

  public static stringBindOut(maxSize: number = undefined): BindParameters {
    return {
      type: DB_TYPE_VARCHAR,
      dir: BIND_OUT,
      maxSize: maxSize,
    };
  }

  public static numberBindIn(value: number): BindParameters {
    return {
      val: value,
      type: NUMBER,
      dir: BIND_IN,
    };
  }

  public static dateBindIn(value: Date): BindParameters {
    return {
      val: value,
      type: DB_TYPE_DATE,
      dir: BIND_IN,
    };
  }

  public static numberBindOut(): BindParameters {
    return {
      type: NUMBER,
      dir: BIND_OUT,
    };
  }

  public static tableOfStringBindOut(
    maxArraySize = 1,
    maxSize: number = undefined,
  ): BindParameters {
    return {
      dir: BIND_OUT,
      type: DB_TYPE_VARCHAR,
      maxSize: maxSize,
      maxArraySize: maxArraySize,
    };
  }

  public static tableOfNumberBindOut(maxArraySize = 1): BindParameters {
    return {
      dir: BIND_OUT,
      type: DB_TYPE_NUMBER,
      maxArraySize: maxArraySize,
    };
  }

  public static getFirstItem(result: any, itemName: string): any {
    if (
      !result ||
      !result.hasOwnProperty('outBinds') ||
      !result.outBinds.hasOwnProperty(itemName)
    ) {
      return null;
    }
    return ArrayHelper.isArrayWithItems(result.outBinds[itemName])
      ? result.outBinds[itemName][0]
      : null;
  }
}
