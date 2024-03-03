import mongoose from 'mongoose';

export const connectDatabase = () => {
  console.log('Wait connecting to the database');

  mongoose
    .connect(process.env.MONGODB_URI, {},)
    .then(() => console.log('MongoDB altas connected!'))
    .catch((error) => console.log(error))
}