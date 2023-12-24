const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

const ExerciseSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/users", async (req, res) => {
  const users = await User.find({}).select("_id username");
  if (!users) {
    res.json({ error: "No users found" });
  } else {
    res.json(users);
  }
});

app.post("/api/users", async (req, res) => {
  const user = new User({
    username: req.body.username,
  });
  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  const id = req.params._id;
  const { description, duration, date } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.send("User not found");
    } else {
      const exercise = new Exercise({
        user_id: id,
        description,
        duration,
        date: date ? new Date(date) : new Date(),
      });
      const saveExercise = await exercise.save();
      res.json({
        _id: user._id,
        username: user.username,
        date: new Date(saveExercise.date).toDateString(),
        duration: saveExercise.duration,
        description: saveExercise.description,
      });
    }
  } catch (error) {
    console.log(error);
    res.send("There was an error saving the exercise");
  }
});

app.get("/api/users/:_id/logs", async (req, res) => {
  const id = req.params._id;

  const { from, to, limit } = req.query;
  const user = await User.findById(id);
  if (!user) {
    res.send("User not found");
  }
  let dateObj = {};
  if (from) {
    dateObj["$gte"] = new Date(from);
  }
  if (to) {
    dateObj["$lte"] = new Date(to);
  }
  let filter = {
    user_id: id,
  };
  if (from || to) {
    filter.date = dateObj;
  }

  let exercises = await Exercise.find(filter).limit(+limit ?? 500);
  let log = exercises.map((e) => ({
    description: e.description,
    duration: e.duration,
    date: e.date.toDateString(),
  }));
  res.json({
    _id: id,
    username: user.username,
    count: exercises.length,
    log,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
