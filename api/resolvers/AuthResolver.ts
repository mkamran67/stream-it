import { Arg, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserModel } from '../entity/User';
import { AuthInput } from '../types/AuthInput';
import { UserResponse } from '../types/UserResponse';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') { email, password }: AuthInput
  ): Promise<UserResponse> {
    // 1. Check for an existing email
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    // 2. Create a new user with a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, passowrd: hashedPassword });
    await user.save();

    // 3. Store userId on the token payload and return the payload with the user response.
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || 'applebees123q'
    );

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: AuthInput
  ): Promise<UserResponse> {
    // 1. Check for an existing email
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new Error('Invalid user.');
    }

    // 2. Check if credientials match/valid
    const valid = await bcrypt.compare(password, existingUser.password);

    if (!valid) {
      throw new Error('Invalid password.');
    }

    // 3. Store userId on the token payload and return the payload with the user response.
    const payload = {
      id: existingUser.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || 'applebees123q'
    );

    return { user: existingUser, token };
  }
}
