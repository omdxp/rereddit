import * as dotenv from "dotenv";

import { __password__, __prod__ } from "./constants";

import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/post";
import path from "path";

dotenv.config();

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post],
  dbName: "rereddit",
  type: "postgresql",
  debug: !__prod__,
  user: "postgres",
  password: process.env.PASSWORD,
} as Parameters<typeof MikroORM.init>[0];
