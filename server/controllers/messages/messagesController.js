const { Messages } = require('../../models');

const getMessage = async (req, res, next) => {
  try {
    const { sender, receiver } = req.params;

    const findMessage = await Messages.find({
      $or: [
        {
          users: { $all: [sender, receiver] },
        },
        {
          users: { $all: [receiver, sender] },
        },
      ],
    });

    return res.json(findMessage);
  } catch (error) {
    next(error);
  }
};

const deleteAll = async (req, res, next) => {
  try {
    const { sender, receiver } = req.params;

    const findMessage = await Messages.deleteMany({
      $or: [
        {
          users: { $all: [sender, receiver] },
        },
        {
          users: { $all: [receiver, sender] },
        },
      ],
    });

    return res.json(findMessage);
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { message, sender, receiver } = req.body;

    const createMessage = await Messages.create({
      users: [sender, receiver],
      sender,
      message,
    });

    return res.json(createMessage);
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getMessage, deleteAll };
