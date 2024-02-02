const Images = require("../modals/images");
const fs = require("fs");
const path = require("path");

// exports.sendImages = async (req, res) => {
//   const imagesdata = await Images.find().exec();
//   console.log(imagesdata);
//   if (!fs.existsSync(imagesdata[0].img)) {
//     return res.status(404).send("Image not found");
//   }

//   fs.readFile(imagesdata[0].img, (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Error reading image file");
//     }

//     const base64Image = Buffer.from(data).toString("base64");
//     res.json(base64Image);
//   });
// };

exports.sendImages = async (req, res) => {
  try {
    const imagesdata = await Images.find().exec();
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
