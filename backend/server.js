const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();




// import routes
const notificationRoutes = require("./routes/notificationRoutes");
const taskRoutes= require("./routes/taskRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const communityRoutes = require("./routes/communityRoutes.js");
const draftRoutes = require("./routes/draftRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/notifications", notificationRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/drafts", draftRoutes);
app.use("/api/projects", projectRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.use("/uploads", express.static("uploads"));
