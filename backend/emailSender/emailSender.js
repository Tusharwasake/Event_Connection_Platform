import "dotenv/config";
import nodemailer from "nodemailer";

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

export { mailsender };
