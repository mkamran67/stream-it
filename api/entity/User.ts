import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

// Declare entity with decorators
// @Field() is declared on properties you want readable. The password is not readable.
// @Property() is declared to allow us to add that property.
// Lastly, we export it as a model for mongodb.
@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  email: string;

  @Property({ required: true })
  password: string;
}

export const UserModel = getModelForClass(User);
