import "reflect-metadata";

import * as dotenv from "dotenv";

import { ApolloServer } from "apollo-server-express";
import { HelloResolver } from "./resolvers/hello";
import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/post";
import { PostResolver } from "./resolvers/post";
import { __prod__ } from "./constants";
import { buildSchema } from "type-graphql";
import express from "express";
import mikroConfig from "./mikro-orm.config";

dotenv.config();

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(2022, () => {
    console.log("Server started on http://localhost:2022");
  });
};

main().catch((err) => {
  console.error(err);
});
