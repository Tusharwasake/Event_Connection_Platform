import { participantModel } from "../models/participantsModel.js";
import { eventModel } from "../models/eventModel.js";

import "dotenv/config";

import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Email options
const mailsender = async (to, subject, code) => {
  const mailOptions = {
    from: '"Tushar wasake" <tusharwasake@gmail.com>', // Sender address
    to: "tusharwasake@gmail.com",
    subject: "Event joining Credential", // Subject line
    text: "Hello! This is the plain text content.", // Fallback plain text
    html: `
        <h1>Online Arena of Event Code:</h1>
        <h1>${code} </h1>
        <p>This is an <b>HTML email</b> sent using Nodemailer.</p>
        <p style="color: blue;">This your 4 Digit Code: ${code}  <a href="https://www.linkup.com">https://www.linkup.com</a></p>
    `, // HTML body content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

const generateUniqueCode = async () => {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = Math.floor(1000 + Math.random() * 9000).toString();

    const existingParticipant = await participantModel.findOne({ code });

    if (!existingParticipant) {
      isUnique = true;
    }
  }
  // console.log(code);
  mailsender(process.env.GMAIL, "This is code", code);
  return code;
};

const participants = async (req, res) => {
  try {
    const code = await generateUniqueCode();

    // console.log(req.user);
    const eventId = req.body.eventId;
    const userId = req.user.userId;

    const newParticipant = await participantModel.create({
      eventId: eventId,
      userId: userId,
      code: code,
    });
    // console.log(newParticipant);
    await newParticipant.save();

    await eventModel.findByIdAndUpdate(eventId, {
      $inc: { participantCount: 1 },
    });

    res.status(200).json({
      message: "participate successfully",
      data: newParticipant,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export { participants };
