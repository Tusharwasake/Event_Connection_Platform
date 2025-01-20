import mongoose from "mongoose";
import { Group } from "../models/groupModel.js";

const createGroup = async (req, res) => {
  const { name, participants } = req.body;

  try {
    const participantObjectIds = participants.map((id) =>
      mongoose.Types.ObjectId(id)
    );
    const newGroup = new Group({ name, participants: participantObjectIds });
    await newGroup.save();

    res.status(201).json({ message: "Group created", group: newGroup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addParticipant = async (req, res) => {
  const { groupId, userId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const userObjectId = mongoose.Types.ObjectId(userId);
    if (!group.participants.includes(userObjectId)) {
      group.participants.push(userObjectId);
      await group.save();
    }

    res.status(200).json({ message: "User added to group", group });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeParticipant = async (req, res) => {
  const { groupId, userId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const userObjectId = mongoose.Types.ObjectId(userId);
    group.participants = group.participants.filter(
      (participant) => !participant.equals(userObjectId)
    );
    await group.save();

    res.status(200).json({ message: "User removed from group", group });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createGroup, addParticipant, removeParticipant };
