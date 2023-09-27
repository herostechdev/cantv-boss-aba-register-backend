import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
// import { ITokenPayload } from '../security/auth/token-payload/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CommonService } from '../services/common.service';
import { IContext } from './context.interface';
// import { User } from '../security/users/user.entity';

@Injectable()
export class ContextService extends CommonService {
  constructor(
    private readonly datasource: DataSource,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  private context: IContext<any>;

  set<T>(context: IContext<T>): void {
    this.context = context;
  }

  getData<T>(): T {
    return this.context.data as T;
  }

  // getUser(): Promise<User> {
  //   try {
  //     const payload = this.jwtService.decode(this.context.authToken, {
  //       complete: true,
  //       json: true,
  //     }) as ITokenPayload;
  //     return this.datasource
  //       .createQueryBuilder(User, 'user')
  //       .where('user.volatileId = :volatileId', {
  //         volatileId: payload.payload.guid,
  //       })
  //       .getOneOrFail();
  //   } catch (error) {
  //     super.exceptionHandler(error);
  //   }
  // }
}
