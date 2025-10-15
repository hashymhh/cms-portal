const connectToMongo = require("./database/db");
const express = require("express");
const app = express();
const path = require("path");
// Connect to MongoDB (or in-memory fallback) and run startup seeds
connectToMongo()
  .then(() => {
    try {
      const seed = require("./tools/startup-seed");
      seed();
    } catch (err) {
      console.error("Error running startup seed:", err);
    }
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
const port = process.env.PORT || 4000;
var cors = require("cors");

app.use(
  cors({
    origin: [
      process.env.FRONTEND_API_LINK,
      "http://localhost:3001",
      "http://localhost:3000",
    ],
  })
);

app.use(express.json()); //to convert request data to json

app.get("/", (req, res) => {
  res.send("Hello 👋 I am Working Fine 🚀");
});

app.use("/media", express.static(path.join(__dirname, "media")));

app.use("/api/admin", require("./routes/details/admin-details.route"));
app.use("/api/faculty", require("./routes/details/faculty-details.route"));
app.use("/api/student", require("./routes/details/student-details.route"));
app.use("/api/coordinator", require("./routes/details/coordinator-details.route"));

app.use("/api/branch", require("./routes/branch.route"));
app.use("/api/subject", require("./routes/subject.route"));
app.use("/api/notice", require("./routes/notice.route"));
app.use("/api/timetable", require("./routes/timetable.route"));
app.use("/api/material", require("./routes/material.route"));
app.use("/api/exam", require("./routes/exam.route"));
app.use("/api/marks", require("./routes/marks.route"));

app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
