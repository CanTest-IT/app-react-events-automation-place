import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

export const db = new JsonDB(
    new Config(process.env.DB_PATH || 'data.json', true, false, '/')
);
