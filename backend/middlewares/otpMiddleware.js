import { participantModel } from "../models/participantsModel.js";
import { lobbyModel } from "../models/lobbyEventModel.js";

const otpCheckerMiddlware = async (req, res) => {
  const { userId, groupId } = req.params;
  const { inputCode } = req.body;

  try {
    const data = await participantModel.find(userId);
    const isValidOtp = data.some((element) => element.code === inputCode);

    if (isValidOtp) {
      // Add user to the group pool
      const groupLobby = await lobbyModel.findById(groupId);
      if (!groupLobby) {
        return res.status(404).json({
          message: "Group not found",
        });
      }

      groupLobby.participants.push(userId);
      await groupLobby.save();

      res.status(200).json({
        message: "User added to the group pool",
        data: data,
      });
    } else {
      res.status(401).json({
        message: "invalid otp",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { otpCheckerMiddlware };
