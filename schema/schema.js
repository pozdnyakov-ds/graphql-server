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
const axios = require("axios");

const CountryType = require("./country");
const AuthorType = require("./author");
const PostType = require("./post");

const { countries } = require("./data");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "",
  fields: {
    country: {
      type: CountryType,
      description: "",
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(countries, { id: args.id });
      },
    },
    hello: {
      type: GraphQLString,
      description: "",
      args: {},
      resolve(parent, args) {
        return "И тебе привет!";
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "Authors list",
      // args: { },
      resolve: async function () {
        let { data } = await axios(
          "https://jsonplaceholder.typicode.com/users"
        );
        return data;
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      description: "Posts list",
      args: {},
      resolve: async function () {
        let { data } = await axios(
          "https://jsonplaceholder.typicode.com/posts"
        );
        return data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
