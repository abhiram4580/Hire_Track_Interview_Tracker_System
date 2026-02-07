
require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");


const prisma = require("./prisma");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/resolvers");
const auth = require("./middleware/auth");



async function startServer() {
  const app = express();
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: ({ req }) => {
      const user = auth(req);
      return { user, prisma };
    },

    // 🔒 HIDE STACK TRACE IN PRODUCTION
    formatError: (err) => {
      if (process.env.NODE_ENV === "production") {
        return {
          message: err.message,
          code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
        };
      }
      // show full error in development
      return err;
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT}`);
});

}

startServer();
