import {
  BindParameters,
  BIND_IN,
  STRING,
  NUMBER,
  BIND_OUT,
  DATE,
  DB_TYPE_VARCHAR,
  DB_TYPE_NUMBER,
  DB_TYPE_RAW,
  DB_TYPE_CURSOR,
  DB_TYPE_OBJECT,
  DB_TYPE_BOOLEAN,
} from 'oracledb';
import { ArrayHelper } from 'src/system/infrastructure/helpers/array.helper';
import { OracleConstants } from './oracle.constants';

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

  public static numberBindOut(): BindParameters {
    return {
      type: NUMBER,
      dir: BIND_OUT,
    };
  }

  public static booleanBindIn(value: number): BindParameters {
    return {
      val: value,
      type: DB_TYPE_BOOLEAN,
      dir: BIND_IN,
    };
  }

  public static booleanBindOut(): BindParameters {
    return {
      type: DB_TYPE_BOOLEAN,
      dir: BIND_OUT,
    };
  }

  public static dateBindIn(value: Date): BindParameters {
    return {
      val: value,
      type: DATE,
      dir: BIND_IN,
    };
  }

  public static dateBindOut(): BindParameters {
    return {
      type: DATE,
      dir: BIND_OUT,
    };
  }

  public static tableOfStringBindOut(
    maxArraySize: number = OracleConstants.MAX_ARRAY_DEFAULT_SIZE,
  ): BindParameters {
    return {
      dir: BIND_OUT,
      type: DB_TYPE_VARCHAR,
      maxArraySize: maxArraySize ?? OracleConstants.MAX_ARRAY_DEFAULT_SIZE,
    };
  }

  public static tableOfNumberBindOut(
    maxArraySize: number = OracleConstants.MAX_ARRAY_DEFAULT_SIZE,
  ): BindParameters {
    return {
      dir: BIND_OUT,
      type: DB_TYPE_NUMBER,
      maxArraySize: maxArraySize ?? OracleConstants.MAX_ARRAY_DEFAULT_SIZE,
    };
  }

  public static rawBindOut(): BindParameters {
    return {
      dir: BIND_OUT,
      type: DB_TYPE_RAW,
    };
  }

  public static cursorBindOut(): BindParameters {
    return {
      dir: BIND_OUT,
      type: DB_TYPE_CURSOR,
    };
  }

  public static objectBindOut(): BindParameters {
    return {
      dir: BIND_OUT,
      type: DB_TYPE_OBJECT,
    };
  }

  public static getParameterValue(result: any, parameterName: string): any {
    return result?.[OracleConstants.OUTBINDS]?.[parameterName];
  }

  private static checkResult(result: any, parameterName: string): boolean {
    return (
      result &&
      result.hasOwnProperty(OracleConstants.OUTBINDS) &&
      result.outBinds.hasOwnProperty(parameterName)
    );
  }

  public static getItems(result: any, parameterName: string): any[] {
    const value = OracleHelper.getParameterValue(result, parameterName);
    return ArrayHelper.isArrayWithItems(value) ? value : null;
  }

  public static getFirstItem(result: any, parameterName: string): any {
    const items = OracleHelper.getItems(result, parameterName);
    return ArrayHelper.isArrayWithItems(items) ? items[0] : null;
  }
}
