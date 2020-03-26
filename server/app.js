require("dotenv").config();

const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const mongoConnection = process.env.MONGO_DB_CONNECTION;
const port = 4000;
const server = express();

server.use(cors());

mongoose.connect(mongoConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
    console.log("Connected to database");
});

server.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

server.listen(port, () => console.log(`Listening on port ${port}`));
