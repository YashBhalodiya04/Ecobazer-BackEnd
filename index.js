const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");
const cartRoute = require("./routes/cartRoute");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
