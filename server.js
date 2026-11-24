import 'dotenv/config'
import express from 'express'
import mongoose from "mongoose";

import './config/connection.js'
import User from './models/User.js';

import noteRoutes from './routes/noteRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express();
const PORT = process.env.PORT || 3001;
 
app.use(express.json());

// and connect to our database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Not connected to Database");
    console.error(error);
  });

// Welcome Base route
app.get("/", (req, res) => {
  res.send("Welcome to our notes API!");
});


 
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

// app.post("/api/users", async (req, res) => {

//   try {
//     const response = await User.create(req.body);
//     res.status(201).json(response);
//   } catch (err) {
//     res.status(500).send("Something went wrong: " + err.message);
//   }
// });

 
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));