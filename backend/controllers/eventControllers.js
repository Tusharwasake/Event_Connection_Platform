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

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updateData = req.body;

    const updatedEvent = await eventModel.findByIdAndUpdate(
      eventId,
      updateData
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    // console.log(eventId);
    const deleteEvent = await eventModel.findByIdAndDelete(eventId);

    if (!deleteEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event deleted successfully",
      deleteEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { eventCreation, getEvents, updateEvent, deleteEvent };
