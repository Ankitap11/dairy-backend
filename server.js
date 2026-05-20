const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb://admin:Admin123@ac-7wcr8ci-shard-00-00.5mnb1xr.mongodb.net:27017,ac-7wcr8ci-shard-00-01.5mnb1xr.mongodb.net:27017,ac-7wcr8ci-shard-00-02.5mnb1xr.mongodb.net:27017/dairyDB?ssl=true&replicaSet=atlas-jjdyqx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Farmer Schema
const FarmerSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Farmer = mongoose.model("Farmer", FarmerSchema);

// Milk Schema
const MilkSchema = new mongoose.Schema({
  farmer: String,
  milk: Number,
  fat: Number,
  amount: Number,
});

const Milk = mongoose.model("Milk", MilkSchema);

// GET FARMERS
app.get("/farmers", async (req, res) => {
  const farmers = await Farmer.find();
  res.json(farmers);
});

// ADD FARMER
app.post("/farmers", async (req, res) => {
  const farmer = new Farmer(req.body);
  await farmer.save();
  res.json(farmer);
});

// GET MILK
app.get("/milk", async (req, res) => {
  const milk = await Milk.find();
  res.json(milk);
});

// ADD MILK
app.post("/milk", async (req, res) => {

  const { farmer, milk, fat } = req.body;

  const amount = milk * fat * 10;

  const newMilk = new Milk({
    farmer,
    milk,
    fat,
    amount,
  });

  await newMilk.save();

  res.json(newMilk);
});

// TEST
app.get("/", (req, res) => {
  res.send("Backend Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});