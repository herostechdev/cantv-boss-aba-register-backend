export class OracleConstants {
  // DB CONNECTION
  public static POOL_ALIAS = 'BOSS_ABA_REGISTER_DB_POOL';

  // PACKAGES
  public static ABA_PACKAGE = 'ABA_PACKAGE';
  public static ACT_PACKAGE = 'ACT_PACKAGE';
  public static BOSS_PACKAGE = 'BOSS_PACKAGE';
  public static UTL_PACKAGE = 'UTL_PACKAGE';

  // STORED PROCEDURES
  public static CHECK_IP = 'CheckIp';
  public static GET_AND_REGISTER_QUALIF_OF_SERVICE =
    'GetAndRegisterQualifOfServ';
  public static GET_ABA_DATA_FROM_REQUESTS = 'GetABADataFromRequests';
  public static GET_INFO_FROM_ABA_REQUESTS = 'GetInfoFromABARequests';
  public static GET_DOWNSTREAM_FROM_PLAN = 'GETDOWNSTREAMFROMPLAN';
  public static GET_IF_REMOTE_INSTALLER_IP = 'GetlfRemoteInstallerIP';
  public static GET_ORDER_ID_FROM_ABA_SALES = 'GetOrderidFromAbaSales';
  public static INSERT_DSL_ABA_REGISTERS = 'InsertDslAbaRegisters';
  public static IS_VALID_IP_ADDRESS = 'IsValidIpAddress';
  public static IS_PREPAID = 'IsPrepago  ';
  public static LOGIN = 'Login';
  public static VERIFY_CONTRACT_BY_PHONE = 'verifycontracbyphone';
}
