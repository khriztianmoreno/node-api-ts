import mongoose from 'mongoose'

import log from './logger';

async function connectDB() {
  const dbUri = process.env.MONGO_URI as string

  return mongoose
  .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info('MongoDB Connected')
    })
    .catch(err => {
      log.error(err)
      process.exit(-1)
    });

}

export default connectDB
