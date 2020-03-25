import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";

// ApolloClient setup
const client = new ApolloClient({
    uri: "http://localhost:4000/graphql" // endpoint that we'll be making requests to
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>My Reading List</h1>
                <BookList />
            </div>
        </ApolloProvider>
    );
}

export default App;
