const Tasklogin = require("../modals/login");
const Taskmenu = require("../modals/menu");
const svgCaptcha = require("svg-captcha");

let captchadata = "";

exports.generateCaptcha = (req, res) => {
  captchadata = svgCaptcha.create();

  req.session.captcha = captchadata.text;

  const svgString = captchadata.data;
  const base64Image = Buffer.from(svgString).toString("base64");

  res.type("json");
  res.status(200).send({
    message: "Resource created successfully",
    data: { img: base64Image },
  });
};

exports.loginValidation = async (req, res) => {
  try {
    const { username, password, captcha } = req.body;
    const user = await Tasklogin.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ errormassage: "Invalid Credentials", massage: "error" });
    }

    if (user.password !== password) {
      return res.status(401).json({ errormassage: "Invalid Credentials" });
    }

    const savedTask = await Taskmenu.find().exec();

    if (captchadata.text != captcha) {
      return res.status(401).json({ error: "Invalid Captcha" });
    }
    res.status(200).json({
      data: savedTask,
      errormassage: "Login successful",
      massage: "success",
    });

    // res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
