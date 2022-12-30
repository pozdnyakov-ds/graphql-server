const {
  graphql,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLID,
} = require("graphql");

const _ = require("lodash");
const AuthorType = require("./author");
const axios = require("axios");

const DataLoader = require("dataloader");
const UsersLoader = new DataLoader((userIds) => {
  return axios("https://jsonplaceholder.typicode.com/users").then((data) =>
    data.data.filter((user) => userIds.includes(user.id))
  );
});

module.exports = new GraphQLObjectType({
  name: "Post",
  description: "",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: async function (post) {
        return UsersLoader.load(post.userId);
      },
    },
    body: { type: GraphQLString },
  }),
});
