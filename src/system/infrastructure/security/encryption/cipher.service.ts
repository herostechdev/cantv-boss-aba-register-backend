import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'crypto';
import * as atob from 'atob';
import { HashService } from './hash.service';
import { SecurityConfigurationService } from 'src/system/configuration/security/security-configuration.service';

@Injectable()
export class CipherService {
  private KEY_LENGTH = 32;
  private ALGORYTHM = 'aes-256-cbc';

  constructor(
    private readonly hashService: HashService,
    private readonly securityConfigurationService: SecurityConfigurationService,
  ) {}

  async cipher(plainText: string): Promise<string> {
    const { key, iv } = await this.getKeyAndIV();
    const cipher = createCipheriv(this.ALGORYTHM, key, iv);
    let encryptedText = cipher.update(plainText, 'utf8', 'base64');
    encryptedText += cipher.final('base64');
    return encryptedText;
  }

  async decipher(encryptedText: string): Promise<string> {
    const { key, iv } = await this.getKeyAndIV();
    const decipher = createDecipheriv(this.ALGORYTHM, key, iv);
    let decryptedText = decipher.update(encryptedText, 'base64', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
  }

  private async getKeyAndIV(): Promise<any> {
    const iv = this.getIV();
    const salt = this.hashService.getSalt();
    const key = await this.getKey(salt);
    return {
      key: key,
      iv: iv,
    };
  }

  private async getKey(salt: string): Promise<Buffer> {
    const arrayBuffer = this.base64ToArrayBuffer(
      this.securityConfigurationService.key,
    );
    return Buffer.from(arrayBuffer);
  }

  private getIV(): Buffer {
    const arrayBuffer = this.base64ToArrayBuffer(
      this.securityConfigurationService.iv,
    );
    return Buffer.from(arrayBuffer);
  }

  private hexToAscii(input: any) {
    const hex = input.toString();
    let output = '';
    for (let n = 0; n < hex.length; n += 2) {
      output = `${output}${String.fromCharCode(
        parseInt(hex.substr(n, 2), 16),
      )}`;
    }
    return output;
  }

  private base64ToArrayBuffer(base64: string): ArrayBufferLike {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
