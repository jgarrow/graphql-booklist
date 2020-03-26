import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { getAuthorsQuery, addBookMutation } from "../queries/queries";

const AddBookForm = () => {
    const [inputValues, setInputValues] = useState({
        name: "",
        genre: "",
        author_id: ""
    });
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);

    const displayAuthors = () => {
        if (loading) {
            return <option disabled>Loading authors...</option>;
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                );
            });
        }
    };

    const handleChange = e => {
        const newInput = { ...inputValues, [e.target.name]: e.target.value };

        setInputValues(newInput);
    };

    const handleSubmit = e => {
        e.preventDefault();

        console.log("inputValues: ", inputValues);
        addBook({ variables: { ...inputValues } });
        setInputValues({
            name: "",
            genre: "",
            author_id: ""
        });
    };

    return (
        <form id="add-book" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="bookName">Title:</label>
                <input
                    id="bookName"
                    type="text"
                    name="name"
                    onChange={handleChange}
                />
            </div>

            <div className="field">
                <label htmlFor="bookGenre">Genre:</label>
                <input
                    id="bookGenre"
                    type="text"
                    name="genre"
                    onChange={handleChange}
                />
            </div>

            <div className="field">
                <label htmlFor="authorName">Author:</label>
                <select
                    id="authorName"
                    name="author_id"
                    onChange={handleChange}
                >
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button type="submit">+</button>
        </form>
    );
};

export default AddBookForm;
