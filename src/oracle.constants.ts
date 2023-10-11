import {
  BindParameters,
  BIND_IN,
  STRING,
  NUMBER,
  BIND_OUT,
  DB_TYPE_VARCHAR,
  DB_TYPE_NUMBER,
} from 'oracledb';

export class OracleConstants {
  // DB CONNECTION
  public static POOL_ALIAS = 'BOSS_ABA_REGISTER_DB_POOL';

  // PACKAGES
  public static ACT_PACKAGE = 'ACT_PACKAGE';
  public static BOSS_PACKAGE = 'BOSS_PACKAGE';

  // STORED PROCEDURES
  public static CHECK_IP = 'CheckIp';
  public static GET_IF_REMOTE_INSTALLER_IP = 'GetlfRemoteInstallerIP';
  public static GET_ORDER_ID_FROM_ABA_SALES = 'GetOrderidFromAbaSales';
  public static LOGIN = 'Login';

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

  public static numberBindIn(value: number): BindParameters {
    return {
      val: value,
      type: NUMBER,
      dir: BIND_IN,
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
      // isArray: true,
      maxArraySize: maxArraySize,
    };
  }
  public static tableOfNumberBindOut(maxArraySize = 1): BindParameters {
    return {
      dir: BIND_OUT,
      type: DB_TYPE_NUMBER,
      // isArray: true,
      maxArraySize: maxArraySize,
    };
  }
}
