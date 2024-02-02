const { Task, TaskDelete } = require("../taskSave");

exports.UpdateuserData = async (req, res) => {
  try {
    const updatedUserData = req.body;
    const filter = { name: updatedUserData.name };
    const update = updatedUserData;
    console.log(update);

    const userdatas = await Task.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!userdatas) {
      return res.status(404).json({ error: "User data not found" });
    }

    console.log(userdatas);
    res.status(200).json(userdatas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.serachUserData = async (req, res) => {
  try {
    const { name, city } = req.body;
    console.log({ name, city });

    let userData;

    if ((name === "" || !name) && city) {
      userData = await TaskDelete.find({ city });
    } else if (name && (city === "" || !city)) {
      userData = await TaskDelete.find({ name });
    } else if ((name === "" || !name) && (city === "" || !city)) {
      userData = await TaskDelete.find().exec();
    }

    if (!userData || userData.length === 0) {
      res.status(404).json({ data: userData, message: "Name not found" });
    } else {
      res.json({ data: userData, message: "success" });
    }
    // const userdata = await TaskDelete.find({ name, city });
    // res.json(userdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletemasterUser = async (req, res) => {
  const name = req.body;
  console.log(name);

  try {
    const result = await TaskDelete.deleteOne(name);

    if (result) {
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
