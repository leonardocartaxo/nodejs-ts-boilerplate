"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoInMemoryConnection = void 0;
const mongoose_1 = require("mongoose");
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoConnection;
let mongoInmemory;
const getMongoInMemoryConnection = async () => {
    if (!mongoConnection) {
        if (!mongoInmemory) {
            mongoInmemory = await mongodb_memory_server_1.MongoMemoryServer.create();
        }
        const mongoUri = mongoInmemory.getUri();
        mongoConnection = (0, mongoose_1.createConnection)(mongoUri);
    }
    return mongoConnection;
};
exports.getMongoInMemoryConnection = getMongoInMemoryConnection;
//# sourceMappingURL=mongo-in-memory-db-manager.js.map