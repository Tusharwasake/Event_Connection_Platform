import { participantModel } from "../models/participantsModel.js";
import { Group } from "../models/groupModel.js";

const otpChecker = async (req, res) => {
  const { userId, groupId } = req.params;
  const { inputCode } = req.body;

  try {
    const data = await participantModel.find(userId);
    const isValidOtp = data.some((element) => element.code === inputCode);

    if (isValidOtp) {
      // Add user to the group pool
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({
          message: "Group not found",
        });
      }

      group.participants.push(userId);
      await group.save();

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

export { otpChecker };
