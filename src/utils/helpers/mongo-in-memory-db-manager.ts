import { Connection, createConnection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoConnection: Connection;
let mongoInmemory: MongoMemoryServer;

export const getMongoInMemoryConnection = async (): Promise<Connection> => {
  if (!mongoConnection) {
    if (!mongoInmemory) {
      mongoInmemory = await MongoMemoryServer.create();
    }
    const mongoUri = mongoInmemory.getUri();
    mongoConnection = createConnection(mongoUri);
  }

  return mongoConnection;
};
