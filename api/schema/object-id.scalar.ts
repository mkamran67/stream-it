import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectId } from 'mongodb';
/**
 * Converts object id to to a string id and reutrns it to the user.
 */

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo Id convertion',
  parseValue(value: string) {
    return new ObjectId(value); // client from input variable
  },
  serialize(value: ObjectId) {
    return value.toHexString(); // Value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value);
    }
    return null;
  },
});
