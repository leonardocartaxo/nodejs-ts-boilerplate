import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoInmemory: MongoMemoryServer;

export const getMongoInMemoryUri = async (): Promise<string> => {
  if (!mongoInmemory) {
    mongoInmemory = await MongoMemoryServer.create();
  }

  return mongoInmemory.getUri();
};

export const stopMongoInMemory = async (): Promise<void> => {
  if (!mongoInmemory) {
    await mongoInmemory.stop();
  }
};
