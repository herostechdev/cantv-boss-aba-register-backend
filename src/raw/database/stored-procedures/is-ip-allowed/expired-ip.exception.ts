import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ExpiredIpException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '031f1420-3fc4-4c1a-ab20-2acaace98719',
      command: BossConstants.GET_IF_REMOTE_INSTALLER_IP,
      objectOrError:
        'Fecha Límite configurada de la Ip está vencida. Acción: Rechazar Intento de Registro Remoto-Indicar que debe contacar a Administrador',
    });
  }
}
