import { v4 as uuidv4 } from 'uuid';

export class StringHelper {
  static uuid() {
    return uuidv4();
  }
}
