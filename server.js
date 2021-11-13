const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./controllers/db");

dotenv.config({ path: "./config/config.env" });

connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/farmer", require("./routes/farmer.route"));
app.use("/api/products", require("./routes/product.route"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port!`);
});
