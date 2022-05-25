
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postsRouter from './routes/posts.js';


const app = express();
import path from 'path';
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use('/posts',postsRouter);
app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


dotenv.config();



const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

