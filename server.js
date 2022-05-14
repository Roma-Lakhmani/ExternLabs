const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
// Initiate our app
const app = express();

// Register app to make it available throught application.
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser("a deep secret"));
app.use(require("./routes/index"));

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.send({
      error: err.message,
      msg: "invalid or expired token.",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
