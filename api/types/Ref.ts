import { ObjectId } from 'mongodb';

// Used to reference to link different models
export type Ref<T> = T | ObjectId;
