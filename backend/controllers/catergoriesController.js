import { eventModel } from "../models/eventModel.js";
import { participantModel } from "../models/participantsModel.js";

const filterByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const filteredEvents = await eventModel.find({ category });
    console.log(filteredEvents);
    res.status(200).json({
      message: "filter successfully",
      data: filteredEvents,
    });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};

export { filterByCategory };
