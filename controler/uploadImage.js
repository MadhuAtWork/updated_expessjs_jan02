const multer = require("multer");
const Images = require("../modals/images");
const Addcarts = require("../modals/addcarts");
const fs = require("fs");
const path = require("path");
// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

exports.uploadImages = upload.single("image");

exports.handleImageUpload = async (req, res) => {
  const file = req.file;
  const { title, price } = req.body;
  console.log({ title, price });
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const newImage = new Images({
    img: `D:/images/${req.file.filename}`,
    title,
    price,
  });

  // Save the instance to the database
  await newImage.save();
  // Handle the uploaded file
  res.status(200).json({ data: "File uploaded successfully." });
};

exports.addcarts = async (req, res) => {
  const id = req.body._id;
  // var cart = [];
  const product = await Images.findById(id);
  if (product) {
    // cart.push(product);
    const addNewcarts = new Addcarts({
      img: product.img,
      title: product.title,
      price: product.price,
    });
    const savedTask = await addNewcarts.save();

    res.send({ massge: "Product added to cart.", data: savedTask });
  } else {
    res.status(404).send("Product not found.");
  }
};

exports.getcarts = async (req, res) => {
  // const carts = await Addcarts.find().exec();
  try {
    const imagesdata = await Addcarts.find().exec();
    console.log(imagesdata);

    const imagePromises = imagesdata.map((imageObj) => {
      return new Promise((resolve, reject) => {
        if (!fs.existsSync(imageObj.img)) {
          reject(`Image not found: ${imageObj.img}`);
        } else {
          fs.readFile(imageObj.img, (err, data) => {
            if (err) {
              console.error(err);
              reject(`Error reading image file: ${imageObj.img}`);
            } else {
              const base64Image = Buffer.from(data).toString("base64");
              resolve({
                _id: imageObj._id,
                imgData: base64Image,
                title: imageObj.title,
                price: imageObj.price,
              });
            }
          });
        }
      });
    });

    Promise.all(imagePromises)
      .then((images) => {
        res.json(images);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
