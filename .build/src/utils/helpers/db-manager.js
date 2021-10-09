"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManager = void 0;
const mongo_in_memory_db_manager_1 = require("./mongo-in-memory-db-manager");
class DBManager {
    static mongoConnection;
    static async getMongoConnection() {
        if (!DBManager.mongoConnection) {
            // remove this in real projects and use a real mongoDb url. This is only for testing purposes
            DBManager.mongoConnection = await (0, mongo_in_memory_db_manager_1.getMongoInMemoryConnection)();
        }
        return DBManager.mongoConnection;
    }
}
exports.DBManager = DBManager;
//# sourceMappingURL=db-manager.js.map