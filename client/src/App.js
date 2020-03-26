import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";

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
                <AddBookForm />
            </div>
        </ApolloProvider>
    );
}

export default App;
