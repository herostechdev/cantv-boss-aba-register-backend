// import { Injectable, Scope } from '@nestjs/common';
// import { isArray } from 'class-validator';
// import { DateTime } from 'luxon';
// import { CreateLogDto } from './create-log.dto';
// import { EntityManager } from 'typeorm';
// import { Log } from './log.entity';
// import { LogsCRUDService } from './logs-crud.service';
// import { UpdateLogDto } from './update-log.dto';

// @Injectable({ scope: Scope.TRANSIENT })
// export class LogsService {
//   constructor(private readonly logsCRUDService: LogsCRUDService) {}

//   private _context: string;

//   private _showInConsole = false;

//   set context(context: string) {
//     this._context = context;
//   }

//   set showInConsole(showInConsole: boolean) {
//     this._showInConsole = showInConsole;
//   }

//   info(dto: CreateLogDto): void {
//     const log = this.getLog(dto, 'info');
//     this.showConsole(dto);
//     this.log(dto);
//   }

//   warn(dto: CreateLogDto): void {
//     const log = this.getLog(dto, 'warn');
//     this.showConsole(dto);
//     this.log(dto);
//   }

//   error(dto: CreateLogDto): void {
//     const log = this.getErrorLog(dto);
//     this.showConsole(dto);
//     this.log(dto);
//   }

//   // TODO: only show console when in DEVELOPMENT mode
//   private showConsole(dto: CreateLogDto): void {
//     if (!this._showInConsole) return;
//     let message = '';
//     if (dto.label) {
//       message = `${message} ${dto.label}: `;
//     }
//     message = `${message} ${dto.message}`;
//     if (dto instanceof CreateLogDto) {
//       const errorLogDto = dto as CreateLogDto;
//       message = `${message} exceptionName: ${errorLogDto.exceptionName}`;
//       message = `${message} statusCode: ${errorLogDto.statusCode}`;
//       message = `${message} stackTrace: ${errorLogDto.stackTrace}`;
//       console.error(message);
//     }
//     if (dto.extraContent) {
//       const extraContent = JSON.parse(dto.extraContent);
//       if (
//         typeof extraContent == 'object' &&
//         extraContent.hasOwnProperty('id')
//       ) {
//         console.log(message, extraContent.id);
//         return;
//       }
//       if (typeof extraContent == 'object' && isArray(extraContent)) {
//         let ids = '';
//         const arrIds = [];
//         for (const extCont of extraContent) {
//           if (
//             extCont &&
//             typeof extCont == 'object' &&
//             extCont.hasOwnProperty('id')
//           ) {
//             arrIds.push(extCont.id);
//             ids += extCont.id.toString() + ' ';
//           } else {
//             arrIds.push(null);
//           }
//         }
//         if (arrIds.length > 0) {
//           console.log(message, arrIds);
//           // console.log(arrIds);
//           return;
//         }
//       }
//       console.log(message, extraContent);
//       return;
//     }
//     console.log(message);
//   }

//   private async log(log: CreateLogDto): Promise<void> {
//     try {
//       await this.logsCRUDService.create(log);
//     } catch (error) {
//       console.log();
//       console.log('Failed to save event log.');
//       console.log(error);
//     }
//   }

//   private getLog(dto: UpdateLogDto, level: string): Log {
//     let label = !this._context ? dto.label : this._context;
//     label = !label ? 'UNKNOWN' : label;
//     return {
//       id: undefined,
//       createdAt: undefined,
//       updatedAt: undefined,
//       level: level,
//       label: label,
//       timestamp: DateTime.now().toJSDate(),
//       message: dto.message,
//       extraContent: dto.extraContent,
//       treeGroup: undefined,
//     };
//   }

//   private getErrorLog(dto: UpdateLogDto): Log {
//     const log = this.getLog(dto, 'error');
//     log.statusCode = dto.statusCode;
//     log.exceptionName = dto.exceptionName;
//     log.stackTrace = dto.stackTrace;
//     return log;
//   }

//   async deleteRequestInfo(
//     codSolicitud: number,
//     transactionalEntityManager: EntityManager,
//   ): Promise<any> {
//     return await this.logsCRUDService.customDeleteRequestInfo(
//       codSolicitud,
//       transactionalEntityManager,
//     );
//   }
// }
