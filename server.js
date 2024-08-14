const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const express = require("express");

// Auth
const verifyToken = require("./middleware/verify-token");

// Controllers
const testJWTRouter = require("./controllers/test-jwt");
const usersRouter = require("./controllers/users");
const profilesRouter = require("./controllers/profiles");

const app = express();

const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/test-jwt", testJWTRouter);
app.use("/users", usersRouter);
app.use("/profiles", verifyToken, profilesRouter);

app.listen(PORT, () => {
  console.log("The express app is ready!");
});
