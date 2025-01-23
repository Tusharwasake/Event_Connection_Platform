import { participantModel } from "../models/participantsModel.js";
import { eventModel } from "../models/eventModel.js";
import { mailsender } from "../emailSender/emailsender.js";

import "dotenv/config";

const generateUniqueCode = async () => {
  let code;
  let isUnique = false;
  
  while (!isUnique) {
    code = Math.floor(1000 + Math.random() * 9000).toString();

    const existingParticipant = await participantModel.findOne({ code });

    if (!existingParticipant) {
      isUnique = true;
    }
  }
  // console.log(code);
  mailsender(process.env.GMAIL, "This is code", code);
  return code;
};

const participants = async (req, res) => {
  try {
    const code = await generateUniqueCode();

    // console.log(req.user);
    const eventId = req.body.eventId;
    const userId = req.user.userId;

    

    const newParticipant = await participantModel.create({
      eventId: eventId,
      userId: userId,
      code: code,
    });
    // console.log(newParticipant);
    await newParticipant.save();

    await eventModel.findByIdAndUpdate(eventId, {
      $inc: { participantCount: 1 },
    });

    res.status(200).json({
      message: "participate successfully",
      data: newParticipant,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export { participants };
