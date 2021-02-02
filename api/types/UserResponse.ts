import { ObjectType, Field } from 'type-graphql';
import { User } from '../entity/User';

// Returns a User and/or token
@ObjectType()
export class UserResponse {
  // returns of type User, can be nullable
  @Field(() => User, { nullable: true })
  user?: User;

  // returns of type string, can be nullable
  @Field(() => String, { nullable: true })
  token?: string;
}
