const express = require("express");
const cors = require("cors");
const app = express();

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
