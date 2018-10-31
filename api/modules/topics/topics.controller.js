import MESSAGES from '../../utils/messages'
import STATUS from '../../utils/status_codes'
import TopicModel from '../../models/topics.model'


export const addTopic = (req, res) => {
  const { title, description } = req.body;
  const newTopic = new TopicModel({title, description});
  newTopic.save();
  res.status(STATUS.OK).json({message: MESSAGES.TOPIC_SUCCESS});
};

export const getTopics = async (req, res) => {
  let topics = await TopicModel.find({});
  topics = topics.map(topic => {
    return {
      title: topic.title,
      description: topic.description,
      created: topic.created,
      id: topic.id
    }
  });
  res.json(topics);
};
