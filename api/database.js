import mongoose from 'mongoose';

export default () => {
  mongoose.connect('mongodb://localhost:27017/brainstorming',
    { useNewUrlParser: true })
    .catch(err  => {
      console.error(err);
      process.exit(0);
    });
};
