import mongoose from 'mongoose';

export const connectDatabase = () => {
  console.log('Wait connecting to the database');

  mongoose
    .connect(
      // eslint-disable-next-line max-len
      'mongodb+srv://fernandaMendes:25316443@projetoambiental.i6j0s57.mongodb.net/api-projeto-ambiental?retryWrites=true&w=majority',
      {},
    )
    .then(() => console.log('MongoDB altas connected!'))
    .catch((error) => console.log(error))
}