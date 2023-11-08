export class OracleConstants {
  // DB CONNECTION
  public static POOL_ALIAS = 'BOSS_ABA_REGISTER_DB_POOL';

  // PACKAGES
  public static ABA_PACKAGE = 'ABA_PACKAGE';
  public static ACT_PACKAGE = 'ACT_PACKAGE';
  public static BOSS_PACKAGE = 'BOSS_PACKAGE';
  public static SIGS_PACKAGE = 'SIGS_PACKAGE';
  public static UTL_PACKAGE = 'UTL_PACKAGE';

  // STORED PROCEDURES
  public static ABA_REGISTER = 'AbaRegister';
  public static CANCEL_ABA_INSTALLATION = 'CancelABAInstallation';
  public static CHECK_IP = 'CheckIp';
  public static CUSTOMER_EXISTS = 'ClientExist';
  public static CREATE_AND_PROVISIONING_CUSTOMER = 'CreateAndProvisionClient';
  public static CREATE_AND_PROVISIONING_MASTER_ACT =
    'CreateAndProvisionMasterAct';
  public static DELETE_ORDER = 'DeleteOrder';
  public static DSL_AUDIT_LOGS = 'DSLAUDITLOGS';
  public static GET_AND_REGISTER_QUALIF_OF_SERVICE =
    'GetAndRegisterQualifOfServ';
  public static GET_ABA_DATA = 'GetAbaData';
  public static GET_ABA_DATA_FROM_REQUESTS = 'GetABADataFromRequests';
  public static GET_ALL_VALUES_FROM_CUSTOMER_VALUES =
    'GetAllValuesFromCltvalues';
  public static GET_CUSTOMER_CLASS_NAME_FROM_ID_VALUE =
    'GetCltClassNameFromIdValue';
  public static GET_CUSTOMER_INSTANCE_ID_FROM_ID_VALUE =
    'GetCltInstanceidFromIdValue';
  public static GET_DATA_FROM_DSLAM_PORT_ID = 'GetDataFromDslamPortid';
  public static GET_DATA_FROM_REQUESTS = 'GetDataFromRequests';
  public static GET_DEBT_FROM_CUSTOMER = 'GetDebtFromClient';
  public static GET_DOWNSTREAM_FROM_PLAN = 'GETDOWNSTREAMFROMPLAN';
  public static GET_DSL_CENTRAL_CO_ID_BY_DSLAM_PORT_ID =
    'GETDSLCENTRALCOIDBYDSLAMPORTID';
  public static GET_FIRST_LETTER_FROM_ABA_REQUEST =
    'GetFirstLetterFromABARequest';
  public static GET_GROUP_ACCESS_FROM_LOGIN = 'GetGroupAccessFromLogin';
  public static GET_IF_REMOTE_INSTALLER_IP = 'GetlfRemoteInstallerIP';
  public static GET_INFO_FROM_ABA_REQUESTS = 'GetInfoFromABARequests';
  public static GET_ORDER_ID_FROM_ABA_SALES = 'GetOrderidFromAbaSales';
  public static GET_PLAN_ABA_FROM_KENAN = 'GetPlanAbaFromKenan';
  public static GET_PLAN_DESCRIPTION_FROM_PLAN_NAME =
    'GetPlanDescriptionFromPlanName';
  public static GET_PORT_ID = 'GetPortId';
  public static GET_PORT_ID_FROM_IP = 'GetPortidFromIp';
  public static GET_STATE_FROM_SERIAL = 'GetStateFromSerial';
  public static GET_VALID_VPI = 'GetValidVPI';
  public static INSERT_DSL_ABA_REGISTERS = 'InsertDslAbaRegisters';
  public static INSERT_MODIFY_CUSTOMER_ATTRIBUTE = 'InsertModifyCltAttribute';
  public static IS_OCCUPIED_PORT = 'IsOccupiedPort';
  public static IS_RESERVED_LOGIN = 'IsReservedLogin';
  public static IS_VALID_IP_ADDRESS = 'IsValidIpAddress';
  public static IS_PREPAID = 'IsPrepago  ';
  public static ISG_ACTION_ALLOWED = 'ISGActionAllowed';
  public static PLAN_BY_CLAS_CLIENT = 'PlansByClassClient';
  public static READ_IABA_ORDER = 'ReadIABAOrder';
  public static UPDATE_DSL_ABA_REGISTERS = 'UpdateDslAbaRegisters';
  public static VERIFY_CONTRACT_BY_PHONE = 'verifycontracbyphone';

  // GENERAL
  public static OCCUPIED_PORT = 1;
}
