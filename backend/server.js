const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => console.error("Kết nối MongoDB thất bại:", err));

app.get("/", (req, res) => {
  res.send("Chào mừng đến với ứng dụng quản lý ý tưởng!");
});

const ideaRoutes = require("./routes/idea.r");
const authRoutes = require("./routes/auth.r");
app.use("/api/ideas", ideaRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
