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

module.exports = new GraphQLObjectType({
  name: "Author",
  description: "",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
