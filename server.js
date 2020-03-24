const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");
const restricted = require("./auth/restrict-middleware.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);
// server.use("/api/users", restricted, checkDepartment("user"), usersRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;

function checkDepartment(department) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.department &&
      req.decodedToken.department.toLowerCase() === department
    ) {
      next();
    } else {
      res.status(403).json({ you: "shall not pass!" });
    }
  };
}
