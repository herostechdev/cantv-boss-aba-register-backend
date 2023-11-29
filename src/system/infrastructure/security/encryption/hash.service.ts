import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import { SecurityConfigurationService } from 'src/system/configuration/security/security-configuration.service';

@Injectable()
export class HashService {
  constructor(
    private readonly securityConfigurationService: SecurityConfigurationService,
  ) {}

  hashing(plainText: string): string {
    const saltOrRounds = this.getSalt();
    return bcrypt.hashSync(plainText, saltOrRounds);
  }

  md5(plainText: string): string {
    return CryptoJS.MD5(plainText).toString();
  }

  md5Base64(plainText: string): string {
    return CryptoJS.MD5(plainText).toString(CryptoJS.enc.Base64);
  }

  md5Hex(plainText: string): string {
    return CryptoJS.MD5(plainText).toString(CryptoJS.enc.Hex);
  }

  getSalt(): string {
    return bcrypt.genSaltSync(this.securityConfigurationService.saltRounds);
  }

  isMatch(plainText: string, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }

  isMatchOrFail(plainText: string, hash: string): void {
    if (this.isMatch(plainText, hash) === false) {
      throw new UnauthorizedException();
    }
  }
}
