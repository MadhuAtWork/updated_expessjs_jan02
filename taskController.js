const { Task, TaskDelete } = require("./taskSave");

exports.createTask = async (req, res) => {
  try {
    const { name, city, fullname, phonenumber, state, email, completed } =
      req.body;

    console.log(req.body);

    const newTask = new Task({
      name,
      city,
      fullname,
      phonenumber,
      state,
      email,
      completed,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDbData = async (req, res) => {
  try {
    const dataFromDb = await Task.find().exec();
    res.json(dataFromDb);
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  console.log(updatedUserData);
  console.log(userId);
  try {
    // Update user by ID
    const updatedUser = await Task.findByIdAndUpdate(
      { _id: userId },
      updatedUserData,
      {
        new: true,
      }
    );
    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await TaskDelete.findByIdAndDelete(userId);

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
