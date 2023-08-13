import { IContext } from './context.interface';

export class ContextHelper {
  static get<T>(authToken: string, data: T): IContext<T> {
    return {
      authToken: authToken,
      data: data,
    };
  }
}
