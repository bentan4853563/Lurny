/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/lurny", require("./routes/api/lurnyRoutes"));

const PORT = process.env.PORT || 5009;

app.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
});
