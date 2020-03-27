import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
    const { loading, data } = useQuery(getBookQuery, {
        variables: { id: bookId }
    });

    const displayBookDetails = () => {
        if (data) {
            return (
                <div>
                    <h2>{data.book.name}</h2>
                    <p>{data.book.genre}</p>
                    <p>{data.book.author.name}</p>
                    <label htmlFor="other-books">
                        All books by this author:
                    </label>
                    <ul id="other-books">
                        {data.book.author.books.map(book => {
                            return <li key={book.id}>{book.name}</li>;
                        })}
                    </ul>
                </div>
            );
        } else {
            return <p>No book selected</p>;
        }
    };

    return <>{!loading && bookId ? <div>{displayBookDetails()}</div> : null}</>;
};

export default BookDetails;
