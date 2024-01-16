import { createLogger, transports, format } from 'winston';

export class CustomJsonTransport extends transports.Stream {
  constructor(options) {
    super(options);
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // Customize the JSON structure here
    const logObject = {
      label: info.label,
      timestamp: info.timestamp,
      level: info.level,
      clazz: info.metadata?.clazz,
      method: info.metadata?.method,
      phoneNumber: info.metadata?.phoneNumber,
      message: info.message,
      input: info.metadata?.input,
      response: info.metadata?.response,
      exception: info.metadata?.error?.name,
      exceptionCode: info.metadata?.error?.code,
      stack: info.metadata?.error?.stack,
      innerException: info.metadata?.error?.innerException,
    };

    // Output the JSON to your desired location (e.g., file, database, console)
    console.log(JSON.stringify(logObject));

    callback();
  }
}
