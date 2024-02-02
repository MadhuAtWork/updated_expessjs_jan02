const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");

// Generate and send OTP via email
const otpStorage = {};
exports.otpSend = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chandrakantmanwar@gmail.com",
      pass: "skcoxcsjielmnmvu",
    },
  });
  const userEmail = req.body.email;

  // Generate a new OTP
  const otp = speakeasy.totp({
    secret: speakeasy.generateSecret().base32,
    step: 300, // OTP changes every 5 minutes
  });

  // Save the OTP in memory
  otpStorage[userEmail] = otp;

  console.log(otp);
  // Email configuration
  const mailOptions = {
    from: "chandrakantmanwar@gmail.com", // Replace with your email
    to: userEmail,
    subject: "Your OTP",
    text: `Your OTP is: ${otp}`,
  };
  console.log(mailOptions);
  console.log(transporter);
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to send OTP" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    }
  });
};

exports.verifyOtp = async (req, res) => {
  const userEmail = req.body.email;
  const otp = req.body.otp;
  if (otpStorage[userEmail] === otp) {
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } else {
    res.status(500).json({ success: false, message: "OTP not verified" });
  }
};
