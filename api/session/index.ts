import { connect } from 'mongoose';

export default async function createSession() {
  const MONGO_URI = process.env.MONGO_URL || '';
  if (!MONGO_URI) {
    throw new Error('Missing MONGO_URI');
  }

  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  };

  await connect(MONGO_URI, options);
}
