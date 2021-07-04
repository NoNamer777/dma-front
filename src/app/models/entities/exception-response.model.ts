import { Entity } from '@app/models';
import { Session } from '@models/entities/session.model';

export type ErrorOrigin = 'Client' | 'Server';

export class ExceptionResponse extends Entity {

  message: string | null = null;

  error: string | null = null;

  status: number | null = null;

  origin: ErrorOrigin | null = null;

  timestamp: number | null = null;

  session: Session | null = null;

  constructor(message: string, origin: ErrorOrigin, session: Session, timestamp?: number, error?: string, status?: number) {
    super();

    this.message = message;
    this.origin = origin;
    this.session = session;
    this.timestamp = new Date().getTime();

    if (status != null) {
      this.status = status;
    }

    if (error != null) {
      this.error = error;
    }

    if (timestamp != null) {
      this.timestamp = timestamp;
    }
  }
}
