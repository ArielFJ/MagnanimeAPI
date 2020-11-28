import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import animesRouter from './routes/animes.js';
import usersRouter from './routes/users.js';

const app = express();

app.use(bodyParser.json());
//app.use(cors);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("Welcome to Magnanime API");
})
app.use('/animes', animesRouter);
app.use('/users', usersRouter);

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', true); 


