const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./configs/passport");
require("dotenv").config();
const expressSession = require("express-session");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(
  expressSession({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

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
app.use("/ideas", ideaRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
