import { InputType, Field } from 'type-graphql';

import { ObjectId } from 'mongodb';

import { Stream } from '../entity/Stream';

// Partial tells TS these properties are optional
@InputType()
export class StreamInput implements Partial<Stream> {}
