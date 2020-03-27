import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
    const { loading, data } = useQuery(getBooksQuery);
    const [selectedBookId, setSelectedBookId] = useState(null);

    const displayBooks = () => {
        if (loading) {
            return <h2>Loading books...</h2>;
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={e => setSelectedBookId(book.id)}>
                        {book.name}
                        {/* <p>{book.name}</p> */}
                        {/* <BookDetails bookId={selectedBookId} /> */}
                    </li>
                );
            });
        }
    };

    return (
        <div>
            <ul id="book-list">{displayBooks()}</ul>
            <BookDetails bookId={selectedBookId} />
        </div>
    );
};

export default BookList;
