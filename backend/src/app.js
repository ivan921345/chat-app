const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.route");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

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

const PORT = process.env.PORT || 5001;
const DB_HOST = process.env.DB_HOST;

const conn = mongoose.connect(DB_HOST, { dbName: "chat_db" });

conn
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
