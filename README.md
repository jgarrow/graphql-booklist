# graphql-booklist

This project was done as a follow-along project using this [GraphQL tutorial](https://github.com/iamshaunjp/graphql-playlist). It uses the following stack:

- React
- Apollo
- Node (Express)
- GraphQL
- MongoDB

At the time the tutorial was made, React hooks did not exist. I refactored the project to utilize React hooks for creating functional components and using `@apollo/apollo-hooks`. I also realize that using subscriptions would be better than refetching the query after a mutation, but with the particular libraries and packages used in the tutorial, it did not seem feasible. 

## Using this project

I have not deployed this repo to production. If you wish to use this repo for yourself, you will have to make any necessary changes to deploy the server and client.

There are two directories for this project: `client` and `server`. To get this project up and running, you could deploy the `server` directory with something like Heroku and then edit the `ApolloClient` uri in `/client/src/App.js` to the corresponding uri from your deployed server. You will also need to set up your own MongoDB database. For this project, I used MongoDB.Atlas (formerly known as MLab). You will have to set up a new `cluster` and follow the instructions for connecting it to your project. My MongoDB connection was placed in a `.env` file and is therefore excluded from this repo's files on GitHub. However you choose to do yours, make sure that your connection gets passed as an argument into the `mongo.connect` function in `/server.app.js`.

