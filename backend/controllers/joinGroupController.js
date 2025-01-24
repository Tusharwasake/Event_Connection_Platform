import { eventModel } from "../models/eventModel.js";
import { lobbyModel } from "../models/lobbyEventModel.js";
import { userModel } from "../models/userModel.js";

const joinGroupController = async (req, res) => {
  const { userId, eventId } = req.participant || {}; // Ensure participant info is provided

  if (!userId || !eventId) {
    return res.status(400).json({
      status: "error",
      message: "Missing userId or eventId in the request",
    });
  }

  try {
    // Find the user
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

    // Find the event by ID
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }

    // Find or create a lobby for the event
    let lobby = await lobbyModel.findOne({ eventId });

    if (!lobby) {
      // If the lobby doesn't exist, create a new one
      lobby = new lobbyModel({
        name: event.name,
        description: event.description,
        participants: [userId],
        eventId: eventId,
      });

      // Save the lobby and update the user's lobbyStatus
      await lobby.save();
      user.lobbyStatus = true;
      await user.save();

      // Add lobby_id to the request object
      req.lobby_id = lobby._id;

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
      // If the lobby exists, check if the user is already in the participants list
      if (lobby.participants.includes(userId)) {
        req.lobby_id = lobby._id;  // Add lobby_id to the request object

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
        // If the user is not in the lobby, add the user to the participants array
        lobby.participants.push(userId);
        await lobby.save();

        req.lobby_id = lobby._id;  // Add lobby_id to the request object

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
