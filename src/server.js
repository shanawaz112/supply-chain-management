const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const connectDB = require("./config/database");
const authenticate = require("./middleware/authenticate");

dotenv.config();
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    return {
      message: err.message,
    };
  },
  // introspection: false,
  // playground: false,
  csrfPrevention: false,
});

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));

async function startServer() {
  await server.start();
  app.use("/graphql", authenticate, expressMiddleware(server));
  connectDB();
  app.listen({ port: process.env.PORT }, () =>
    console.log(`Server is running on http://localhost:4000/graphql`)
  );
}

startServer();
