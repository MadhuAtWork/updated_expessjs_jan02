// const svgCaptcha = require("svg-captcha");

// let captcha = "";

// exports.generateCaptcha = (req, res) => {
//   captcha = svgCaptcha.create();
//   req.session.captcha = captcha.text;

//   const svgString = captcha.data;
//   const base64Image = Buffer.from(svgString).toString("base64");

//   res.type("json");
//   res.status(200).send({
//     message: "Resource created successfully",
//     data: { img: base64Image },
//   });
// };

// exports.validateCaptcha = (req, res) => {
//   const userEnteredCaptcha = req.body.captcha;

//   console.log("frontend", userEnteredCaptcha);
//   console.log("backend", captcha.text);
//   if (userEnteredCaptcha == captcha.text) {
//     res.status(200).send({ message: "Captcha validation successful" });
//   } else {
//     res.status(400).send({ message: "Captcha validation failed" });
//   }
// };
