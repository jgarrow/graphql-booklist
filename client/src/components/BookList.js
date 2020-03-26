import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { getBooksQuery } from "../queries/queries";

const BookList = props => {
    const { loading, error, data } = useQuery(getBooksQuery);

    const displayBooks = () => {
        if (loading) {
            return <h2>Loading books...</h2>;
        } else {
            return data.books.map(book => {
                return <li key={book.id}>{book.name}</li>;
            });
        }
    };

    return (
        <div>
            <ul id="book-list">{displayBooks()}</ul>
        </div>
    );
};

export default BookList;
