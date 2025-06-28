// server/lib/sendEmail.js
import nodemailer from "nodemailer"

const sendEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // use App Password
    },
  });

  const mailOptions = {
    from: `"QuickChat" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code for QuickChat",
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;

