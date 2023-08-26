import Task from "../model/Task.js";

// create task
export const createTask = async (req, res) => {
  const task = new Task(req.body);
  console.log(task);

  try {
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all single tasks

export const getTasks = async (req, res) => {
  const search = req.query.search || "";
  const sortOption = req.query.sort || "asc";

  try {
    let sortDirection = 1; // Default: ascending
    if (sortOption === "desc") {
      sortDirection = -1; // Change to descending
    }

    const tasks = await Task.find({
      task: { $regex: search, $options: "i" },
    }).sort({ createdAt: sortDirection });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// find single task
export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a post
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    res.status(200).json("Task deleted successfuly");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a post
export const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
