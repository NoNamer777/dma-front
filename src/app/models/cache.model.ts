import { Session } from './entities';

export class Cache {

  [key: string]: unknown;

  session: Session | null = null;

  useLocalStorage = false;
}
