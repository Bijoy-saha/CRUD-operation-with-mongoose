const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schema/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);
router.get("/", async (req, res) => {
  await Todo.find({ status: "active" }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "serverside error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "getting data is okay",
      });
    }
  }).clone();
});
router.get("/:id", async (req, res) => {
  await Todo.find(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Todo was updated successfully!",
        });
      }
    }
  );
});
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        err: "there  is server side error",
      });
    } else {
      res.status(200).json({
        err: "success inseration",
      });
    }
  });
});
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        err: "there is server side error in many ",
      });
    } else {
      res.status(200).json({
        message: "there ok in manypost ",
      });
    }
  });
});
router.delete("/:id", async (req, res) => {

  await Todo.deleteOne({
    _id: req.params.id},
  (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was deleted successfully!",
      });
    }
  })
});
router.put("/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Todo was updated successfully!",
        });
      }
    }
  ).clone();
  console.log(result);
});

module.exports = router;
