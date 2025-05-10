import { lobbyModel } from "../models/lobbyEventModel.js";

const getgroupParticipants = async (req, res) => {
  const  lobbyId  = req.query.lobby_id;  // Assume lobbyId is passed as a query parameter
  
  if (!lobbyId) {
    return res.status(400).json({
      status: "error",
      message: "Lobby ID is required",
    });
  }

  try {
    // Find the lobby by ID
    const lobby = await lobbyModel.findById(lobbyId).populate('participants');  // Populate participants (if needed)

    if (!lobby) {
      return res.status(404).json({
        status: "error",
        message: "Lobby not found",
      });
    }

    // Return the participants of the group
    return res.status(200).json({
      status: "success",
      message: "Group participants fetched successfully",
      data: {
        lobbyId: lobby._id,
        name: lobby.name,
        description: lobby.description,
        participants: lobby.participants,  // You can expand this if you want user details like name, email, etc.
        eventId: lobby.eventId,
      },
    });
  } catch (error) {
    console.error("Error fetching group participants:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export { getgroupParticipants };
