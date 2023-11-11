import { IStatusResponse } from 'src/responses/status-response.interface';
import { LoginActionStausConstants } from './login.constans';

export type ILoginResponse = IStatusResponse<LoginActionStausConstants>;
