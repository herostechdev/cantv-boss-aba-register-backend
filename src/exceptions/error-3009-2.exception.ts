import { BossConstants } from 'src/boss/boss.constants';
import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';
import {
  IException,
  toIException,
} from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class Error30092Exception extends CustomInternalServerException {
  constructor(command: string, innerException?: IException) {
    super({
      code: '3009-2',
      guid: '1afab4a6-e393-4801-8000-20ed5a160cec',
      command: command,
      objectOrError:
        'Se intenta registrar en el puerto asignado a otro usuario. Usuario debe apagar el módem y encender el módem en distintas horas, hasta que se solvente, en caso contrario el usuario debe cambiar el módem',
      innerException: toIException(innerException),
    });
  }
}
