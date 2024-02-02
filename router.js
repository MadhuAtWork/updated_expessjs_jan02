const express = require("express");
const router = express.Router();
const taskController = require("./taskController");
const captchaController = require("./captchaController");
const otpControler = require("./otpControler");
const login = require("./controler/login");
const master = require("./controler/master");
const images = require("./controler/images");
const upload = require("./controler/uploadImage");

router.post("/taskSaveApi", taskController.createTask);

router.get("/getDbDataApi", taskController.getDbData);
router.put("/updateUser/:userId", taskController.updateUser);
router.delete("/deleteUser/:userId", taskController.deleteUser);

// router.post("/validateCaptcha", captchaController.validateCaptcha);

router.post("/otpSend", otpControler.otpSend);
router.post("/verifyOtp", otpControler.verifyOtp);

router.get("/captcha", login.generateCaptcha);
router.post("/login", login.loginValidation);

router.put("/updateMasterUser", master.UpdateuserData);
router.post("/searchuser", master.serachUserData);
router.delete("/deleteUser", master.deletemasterUser);

router.get("/getImages", images.sendImages);

router.post("/upload", upload.uploadImages, upload.handleImageUpload);

router.post("/addcarts", upload.addcarts);
router.get("/getcarts", upload.getcarts);

module.exports = router;
