import { Session } from './entities';

export class Storage {

  [index: string]: unknown;

  static KEYS = Object.keys(new Storage());

  session = new Session();
}
