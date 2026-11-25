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

// Welcome Base route
app.get("/", (req, res) => {
  res.send("Welcome to our notes API!");
});

 
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

 
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));