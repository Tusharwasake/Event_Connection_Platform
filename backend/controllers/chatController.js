import { Chat } from "../models/chatModel.js";

const sendMessage = async (req, res) => {
  const { groupId, senderId, message } = req.body;

  try {
    const newMessage = new Chat({ groupId, sender: senderId, message });
    await newMessage.save();

    // Emit chat message event
    io.emit("receiveMessage", newMessage);

    res.status(200).json({ message: "Message sent", data: newMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { sendMessage };


const getMessages = async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await Chat.find({ groupId }).sort({ timestamp: -1 });
    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getMessages };
