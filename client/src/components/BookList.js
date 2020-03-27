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
            return data.books.map((book, index) => {
                return (
                    <li
                        key={book.id}
                        tabIndex={index + 1}
                        onClick={e => setSelectedBookId(book.id)}
                        onKeyPress={e => {
                            if (e.key === "Enter") {
                                setSelectedBookId(book.id);
                            }
                        }}
                    >
                        {book.name}
                    </li>
                );
            });
        }
    };

    return (
        <div id="content-wrapper">
            <ul id="book-list">{displayBooks()}</ul>
            <section className="book-details">
                <BookDetails bookId={selectedBookId} />
            </section>
        </div>
    );
};

export default BookList;
