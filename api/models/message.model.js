import mongoose from 'mongoose';


const MessageSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: mongoose.Schema.ObjectId,
    ref: 'Topic',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now(),
    required: true
  },
});

export default mongoose.model('Message', MessageSchema);
