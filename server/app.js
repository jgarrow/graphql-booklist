const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const port = 4000;
const server = express();

server.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

server.listen(port, () => console.log(`Listening on port ${port}`));
