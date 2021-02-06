import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { ObjectId } from 'mongodb';
import path from 'path';

import { UserResolver } from '../resolvers/UserResolver';
import { AuthResolver } from '../resolvers/AuthResolver';
import { StreamResolver } from '../resolvers/StreamResolver';
import { ObjectIdScalar } from './object-id.scalar';
import { TypegooseMiddleware } from '../middleware/typegoose';

// build a TypeGraphQL executable schema
export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    // 1. add all typescript resolvers
    resolvers: [UserResolver, AuthResolver, StreamResolver],
    // generates a schema file everytime the server starts - optional - used later to auto generate front end mutations and queries
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    // 2. use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // 3. use ObjectId scalar mappings
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });

  return schema;
}
