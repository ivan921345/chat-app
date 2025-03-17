// imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.route");
const messageRouter = require("./routes/message.route");
const { app, server } = require("./socket/socket");
// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRouter);

// middlewares
app.use((_, res, __) => {
  res.status(404).json({
    messsage: "Not Found",
  });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({
    message,
  });
});
// db connection
const PORT = process.env.PORT || 5001;
const DB_HOST = process.env.DB_HOST;

const conn = mongoose.connect(DB_HOST, { dbName: "chat_db" });

conn
  .then(() => {
    server.listen(PORT, () => {
      console.log(`App is listening port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
