import axios, { AxiosInstance } from 'axios';
import * as https from 'https';

export class HttpHelper {
  public static getAxiosInstance(): AxiosInstance {
    return axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        timeout: Number(process.env.APP_HTTP_TIMEOUT),
      }),
    });
  }
}
