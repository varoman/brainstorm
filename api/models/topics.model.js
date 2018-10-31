import mongoose from 'mongoose';


const TopicSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now(),
    required: true
  },
});

export default mongoose.model('Topic', TopicSchema);
