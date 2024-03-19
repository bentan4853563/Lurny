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
app.use("/api/auth", require("./routes/api/newAuth"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5009;

app.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
});
