import { Router } from "express";
import { participants } from "../controllers/participantController.js";
import { authentication } from "../middlewares/authMiddleware.js";
import { eventCreation, getEvents,deleteEvent, updateEvent } from "../controllers/eventControllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const eventRouter = Router();

eventRouter.use(authentication);

eventRouter.post("/", isAdmin, eventCreation);

eventRouter.get("/", getEvents);

eventRouter.put("/:eventId", isAdmin, updateEvent);

// Route to delete an event (only for admins)
eventRouter.delete("/:eventId", isAdmin, deleteEvent);



export { eventRouter };
