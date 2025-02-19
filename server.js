const express = require("express");
const cors = require("cors");
const app = express();
let corsOptions = { origin: "http://localhost:3000" }
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./config/db.config")
require("dotenv").config()
//  dotenv.config({path: ".env"})

app.use('/uploads', express.static('uploads'));
app.get("/", (req, res) => {
  res.json({ message: "node-perfect-match" });
});
require("./routes/perfect-match.route.js")(app);


const port = process.env.PORT || 8080;

console.log('db:::', process.env.DATABASE_URL)


app.listen(port, () => { console.log(`server is running on port ${port}.`) });
