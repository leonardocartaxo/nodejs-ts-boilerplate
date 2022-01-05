import { Connection } from 'mongoose';
import { getMongoInMemoryUri } from '../../../tests/utils/mongo-in-memory-db-manager';

export class DBManager {
  private static mongoConnection: Connection;

  static async getMongoConnection (): Promise<Connection> {
    if (!DBManager.mongoConnection) {
      // remove this in real projects and use a real mongoDb url. This is only for testing purposes
      DBManager.mongoConnection = await getMongoInMemoryUri();
    }

    return DBManager.mongoConnection;
  }
}
