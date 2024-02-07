import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetDHCPDataInvalidResponseException extends CustomBadRequestException {
  constructor(response?: string) {
    super({
      code: '',
      guid: '8e23887d-209a-414b-ae2e-1ef7f4515374',
      command: process.env.BOSS_GET_DHCP_DATA_URL,
      objectOrError: `La respuesta ${response} del servicio de consulta de datos DHCP es inválida`,
    });
  }
}
