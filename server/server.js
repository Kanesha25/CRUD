const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });


app.use("/api/products", require("./routes/products"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/employees", require("./routes/employees"));


app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
