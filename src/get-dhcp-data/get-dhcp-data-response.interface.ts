export interface IGetDHCPDataResponse {
  vpi: string; // Virtual Path Indicator. Indicador virtual de ruta. Identifica a la central
  vci: string; // Interfaz virtual del circuito. Número que identifica el puerto de la central
  nsp: string; // Dirección por la que la central atiende
}
