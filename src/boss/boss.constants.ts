export class BossConstants {
  // PACKAGES
  public static ABA_PACKAGE = 'ABA_PACKAGE';
  public static ACT_PACKAGE = 'ACT_PACKAGE';
  public static BOSS_PACKAGE = 'BOSS_PACKAGE';
  public static SIGS_PACKAGE = 'SIGS_PACKAGE';
  public static SAC_PACKAGE = 'sac';
  public static UTL_PACKAGE = 'UTL_PACKAGE';

  // FUNCTIONS
  public static GET_ABA_PLAN_FOR_KENAN = 'GetPlanAbaForKenan';

  // STORED PROCEDURES
  public static ABA_REGISTER = 'AbaRegister';
  public static PAY_ABA_INSTALLATION = 'CancelABAInstallation';
  public static CHECK_IP = 'CheckIp';
  public static CUSTOMER_EXISTS = 'ClientExist';
  public static CREATE_AND_PROVISIONING_CUSTOMER = 'CreateAndProvisionClient';
  public static CREATE_AND_PROVISIONING_MASTER_ACCOUNT =
    'CreateAndProvisionMasterAct';
  public static DELETE_ORDER = 'DeleteOrder';
  public static INSERT_DSL_AUDIT_LOGS = 'insertdslauditlogs';
  public static GET_AND_REGISTER_QUALIF_OF_SERVICE =
    'GetAndRegisterQualifOfServ';
  public static GET_ABA_DATA = 'GetAbaData';
  public static GET_ABA_DATA_FROM_REQUESTS = 'GetABADataFromRequests';
  public static GET_ALL_VALUES_FROM_CUSTOMER_VALUES =
    'GetAllValuesFromCltvalues';
  public static GET_CSID_AND_PLAN_NAME_FROM_LOGIN =
    'GetCSIdAndPlanNameFromLogin';
  public static GET_CUSTOMER_CLASS_NAME_FROM_ID_VALUE =
    'GetCltClassNameFromIdValue';
  public static GET_CUSTOMER_INSTANCE_ID_FROM_ID_VALUE =
    'GetCltInstanceidFromIdValue';
  public static GET_DATA_FROM_DSLAM_PORT_ID = 'GetDataFromDslamPortid';
  public static GET_DATA_FROM_REQUESTS = 'GetDataFromRequests';
  public static GET_DEBT_FROM_CUSTOMER = 'GetDebtFromClient';
  public static GET_DOWNSTREAM_FROM_PLAN = 'GETDOWNSTREAMFROMPLAN';
  public static GET_DSL_AREA_CODES = 'GETDSLAREACODES';
  public static GET_DSL_CENTRAL_CO_ID_BY_DSLAM_PORT_ID =
    'GETDSLCENTRALCOIDBYDSLAMPORTID';
  public static GET_FIRST_LETTER_FROM_ABA_REQUEST =
    'GetFirstLetterFromABARequest';
  public static GET_GROUP_ACCESS_FROM_LOGIN = 'GetGroupAccessFromLogin';
  public static GET_IF_REMOTE_INSTALLER_IP = 'GetlfRemoteInstallerIP';
  public static GET_INFO_FROM_ABA_REQUESTS = 'GetInfoFromABARequests';
  public static GET_ORDER_ID_FROM_ABA_SALES = 'GetOrderidFromAbaSales';
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
  public static IS_PREPAID = 'IsPrepago';
  public static ISG_ACTION_ALLOWED = 'ISGActionAllowed';
  public static PLAN_BY_CUSTOMER_CLASS = 'PlansByClassClient';
  public static READ_IABA_ORDER = 'ReadIABAOrder';
  public static REVERSE_ABA_REGISTER = 'ReverseAbaRegister';
  public static UPDATE_DSL_ABA_REGISTERS = 'UpdateDslAbaRegisters';
  public static VERIFY_CONTRACT_BY_PHONE = 'verifycontracbyphone';

  // NUMBERS

  public static ZERO = 0;
  public static ONE = 1;

  // DATES

  public static DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';

  // GENERAL
  public static ABA_PHONE_AREA_CODE = 'COD_AREA_ABA';
  public static ABA_PHONE = 'TLF_ABA';
  public static ABA_SEND_NOT_OK_NOTIFICATION =
    'Enviando notificación de registro fallido al servicio ABA';
  public static ABA_SENT_NOT_OK_NOTIFICATION =
    'La notificación de registro fallido al servicio ABA fue enviada';
  public static ABA_SEND_OK_NOTIFICATION =
    'Enviando notificación de registro exitoso al servicio ABA';
  public static ABA_SENT_OK_NOTIFICATION =
    'La notificación de registro exitoso al servicio ABA fue enviada';
  public static ADSL = 'ADSL';
  public static ASAP_ORDER_COMRED_STATUS = 399;
  public static CANTV_BILLING = 'FACTURA_CANTV';
  public static CONFIRM_METHOD = 'confirm';
  public static END = 'Fin';
  public static EXECUTE = 'execute';
  public static FISCAL_IDENTIFICATION_DOCUMENT_TYPE = 'NO_RIF';
  public static INSTALL_ABA = 'INSTALAR_ABA';
  public static INTERNET_ACCESS = 'Acceso Internet';
  public static EXECUTING = 'EN_EJECUCION';
  public static IN_PROGRESS = 'EN_PROCESO';
  public static NATIONAL_IDENTIFICATION_DOCUMENT_TYPE = 'CEDULA_IDENTIDAD';
  public static NATURAL_PERSON = 'NATURALES';
  public static NORMAL = 'NORMAL';
  public static NOT_PROCESSED = 'NO_PROCESADO';
  public static NULL = 'NULL';
  public static NOT_AVAILABLE = 'NO_DISPONIBLE';
  public static OCCUPIED_PORT = 1;
  public static OK_RESPONSE = '0000';
  public static PHONE = 'TELEFONO';
  public static PHONE_AREA_CODE = 'CODIGO_TLF_AREA';
  public static PROCESSED = 'PROCESADO';
  public static REGISTER = 'Registro';
  public static START = 'Inicio';
  public static USERS = 'USUARIOS';
  public static UNKNOWN = 'UNKNOWN';
  public static VALIDATE_METHOD = 'validate';
  public static VENEZUELA = 'VENEZUELA';
}
