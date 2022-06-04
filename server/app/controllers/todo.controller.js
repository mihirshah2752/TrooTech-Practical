const db = require("../models");
const ToDo = db.todo;
// Create and Save a new ToDo
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a ToDo
  let todo = new ToDo({
    username: req.body.username,
    gender: req.body.gender,
    hobby: req.body.hobby,
    age: req.body.age,
    date: req.body.date,
    taskname: req.body.taskname,
    status: req.body.status,
  });
  // Save ToDo in the database
  todo
    .save(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the ToDo.",
      });
    });
};
// Retrieve all ToDo from the database.
exports.findAll = (req, res) => {
  ToDo.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ToDos.",
      });
    });
};
// Find a single ToDo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ToDo.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found ToDo with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving ToDo with id=" + id });
    });
};
// Update a ToDo by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  ToDo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ToDo with id=${id}. Maybe ToDo was not found!`,
        });
      } else res.send({ message: "ToDo was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ToDo with id=" + id,
      });
    });
};
// Delete a ToDo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  ToDo.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete ToDo with id=${id}. Maybe ToDo was not found!`,
        });
      } else {
        res.send({
          message: "ToDo was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ToDo with id=" + id,
      });
    });
};
// Delete all ToDo from the database.
exports.deleteAll = (req, res) => {
  ToDo.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} ToDo were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all ToDo.",
      });
    });
};
