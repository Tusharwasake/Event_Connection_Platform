import { eventModel } from "../models/eventModel.js";

const eventCreation = async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      imageUrl,
      startDate,
      endDate,
      category,
    } = req.body;
    const eventCategory = category && category.length > 0 ? category : [];

    const createdBy = req.user.userId;

    if (
      !name ||
      !description ||
      !location ||
      !imageUrl ||
      !startDate ||
      !endDate ||
      !eventCategory ||
      !createdBy
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const payload = {
      name,
      description,
      location,
      imageUrl,
      category: eventCategory,
      startDate,
      endDate,
      createdBy,
    };

    const createEvent = await eventModel.create(payload);

    res.status(200).json({
      message: "Event created successfully",
      data: createEvent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const allEvents = await eventModel.find({});
    res.status(200).json({
      message: "Events retrieved successfully",
      data: allEvents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { eventCreation, getEvents };
