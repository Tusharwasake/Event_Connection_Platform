import { participantModel } from "../models/participantsModel.js";

const joinGroupAuthentication = async (req, res, next) => {
  const userId = req.user.userId;

  const groupId = req.params.groupId;

  const enterOtp = req.body.otp;

  console.log(userId, groupId, enterOtp);

  if (!userId || !groupId) {
    return res.json({
      message: "Missing UserID and groupId",
    });
  }

  if (!enterOtp) {
    return res.json({
      message: "OTP is Empty",
    });
  }

  try {
    const participant = await participantModel.findOne({
      userId: userId,
      eventId: groupId,
      code: enterOtp,
    });

    if (!participant) {
      return res.status(404).json({
        message:
          "No matching participant found for the given UserID, GroupID, and OTP",
      });
    }

    req.participant = participant;

    next();
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { joinGroupAuthentication };
