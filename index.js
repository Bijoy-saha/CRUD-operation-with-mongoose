const express = require("express");
const app = express();
app.use(express.json());
const todoHandler = require("./handler/todoHandler");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/todos")
  .then(() => {
    console.log("succeessffuull");
  })
  .catch((err) => {
    console.log(err);
  });
  app.use("/todo", todoHandler);
function errHnadler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
 
}
app.listen(3000, () => {
  console.log("listening on this port sir..");
});
