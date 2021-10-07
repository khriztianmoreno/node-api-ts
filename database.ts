import mongoose from 'mongoose'

async function connectDB() {
  const dbUri = process.env.MONGO_URI as string

  return mongoose
  .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB Connected')
    })
    .catch(err => {
      console.log(err)
      process.exit(-1)
    });

}

export default connectDB
