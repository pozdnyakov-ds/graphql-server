const { 
  graphql, GraphQLString, GraphQLList, GraphQLObjectType, 
  GraphQLNonNull, GraphQLSchema, GraphQLID 
} = require("graphql");
const _ = require("lodash");

const { countries } = require("./country");

const CountryType = new GraphQLObjectType({
  name: "Country",
  description: "",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    capital: { type: GraphQLString }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author_id: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: function(post) {
        return authors.find(e => e.id === post.author_id)
      }
    },
    body: { type: GraphQLString}
  }),
});


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
      args: { },
      resolve(parent, args) {
        return "И тебе привет!";
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "",
      // args: { },
      resolve: function() {
        return [
          {
            id: '1',
            name: "Dmitry"
          }
        ]
      },
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});