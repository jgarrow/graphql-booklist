const graphql = require("graphql");
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// data fixture
const books = [
    {
        name: "Name of the Wind",
        genre: "Fantasy",
        id: "1",
        author_id: "1"
    },
    {
        name: "The Final Empire",
        genre: "Fantasy",
        id: "2",
        author_id: "2"
    },
    {
        name: "The Long Earth",
        genre: "Sci-Fi",
        id: "3",
        author_id: "3"
    },
    {
        name: "The Hero of Ages",
        genre: "Fantasy",
        id: "4",
        author_id: "2"
    },
    {
        name: "The Colour of Magic",
        genre: "Fantasy",
        id: "5",
        author_id: "3"
    },
    {
        name: "The Light Fantastic",
        genre: "Fantasy",
        id: "6",
        author_id: "3"
    }
];

const authors = [
    {
        name: "Patrick Rothfuss",
        age: 44,
        id: "1"
    },
    {
        name: "Brandon Sanderson",
        age: 42,
        id: "2"
    },
    {
        name: "Terry Pratchett",
        age: 66,
        id: "3"
    }
];

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
                return _.find(authors, { id: parent.author_id });
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
                return _.filter(books, { author_id: parent.id });
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
                return _.find(books, { id: args.id }); // using lodash to find the book with args.id
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // args.id comes in as a string
                return _.find(authors, { id: args.id }); // using lodash to find the author with args.id
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
