const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB
connectDB();
// Routes
app.use("/api/auth", require("./routes/route.auth"));
app.use("/api/products", require("./routes/route.product"));
app.use("/api/sales", require("./routes/route.sale"));
app.use("/api/users", require("./routes/routes.user"));


app.get("/", (req, res) => {
  res.send("POS API Running...");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
