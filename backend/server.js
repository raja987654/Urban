const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/posts");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

//config Env variables
dotenv.config();

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// config routes
// post route
app.use("/api", authRouter);
app.use("/api", postRoutes);
app.use("/api", userRouter);

// route for checking API is running or not
app.get("/", (req, res) => {
  res.send("API is running");
});
// MongoDB connection URL
const CONNECTION_URL = process.env.CONNECTION_URL;

//config PORT
const PORT = process.env.PORT || 5000;

// setting up connection to mongodb and start sever
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
