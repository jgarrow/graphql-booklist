const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // parent is the data for the requested Book object
                return Author.findById(parent.author_id);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ author_id: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } }, // let's user query for specific book by id
            resolve(parent, args) {
                // code to get data from database/other source
                // args.id comes in as a string
                // return _.find(books, { id: args.id }); // using lodash to find the book with args.id

                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // args.id comes in as a string
                // return _.find(authors, { id: args.id }); // using lodash to find the author with args.id

                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({}); // find with an empty object will return all of them
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }, // GraphQLNonNull means this type can't be null
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                // new Author() is an instance Author from the model
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save(); // mongoose saves it to database
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                author_id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                // new Book() is an instance Book from the model
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    author_id: args.author_id
                });
                return book.save(); // mongoose saves it to database
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
