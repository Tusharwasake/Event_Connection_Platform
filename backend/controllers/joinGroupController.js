import { eventModel } from "../models/eventModel.js";
import { lobbyModel } from "../models/lobbyEventModel.js";
import { participants } from "./participantController.js";
import { userModel } from "../models/userModel.js";
const joinGroupController = async (req, res) => {
  const userId = req.participant.userId;
  const eventId = req.participant.eventId;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check if the user is already in a lobby
    if (user.lobbyStatus) {
      return res.status(400).json({
        status: "error",
        message: "User is already in a lobby",
      });
    }

    const event = await eventModel.findById({ _id: eventId });
    const eventobj = event[0];

    let lobby = await lobbyModel.findOne({ eventId });

    if (!lobby) {
      // If the lobby doesn't exist, create a new one
      lobby = new lobbyModel({
        name: event.name,
        description: event.description,
        participants: [userId],
        eventId: eventId,
      });

      await lobby.save();

      user.lobbyStatus = true;
      await user.save();
      // Respond with success message and lobby details
      return res.status(200).json({
        status: "success",
        message: "Joined the group successfully",
        data: {
          lobbyId: lobby._id,
          name: lobby.name,
          description: lobby.description,
          participants: lobby.participants,
          eventId: lobby.eventId,
        },
      });
    } else {
      // If the lobby exists, add the user to the participants array (if not already present)
      if (lobby.participants.includes(userId)) {
        return res.status(200).json({
          status: "success",
          message: "User is already present in the event/lobby",
          data: {
            lobbyId: lobby._id,
            name: lobby.name,
            description: lobby.description,
            participants: lobby.participants,
            eventId: lobby.eventId,
          },
        });
      } else {
        lobby.participants.push(userId);
        await lobby.save();

        // Respond with success message and updated lobby details
        return res.status(200).json({
          status: "success",
          message: "Joined the group successfully",
          data: {
            lobbyId: lobby._id,
            name: lobby.name,
            description: lobby.description,
            participants: lobby.participants,
            eventId: lobby.eventId,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export { joinGroupController };
