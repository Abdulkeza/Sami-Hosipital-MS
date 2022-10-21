import mongoose from "mongoose";
import dotenv from 'dotenv';
import  color  from "colors";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open',() =>{
console.log('Database connected!'.blue.underline);
});

mongoose.connection.on('error', (err) =>{
    console.log(`MongoDB error: ${err}`.red.underline.bold);
    process.exit(1)
});

const mongoConnect = async () =>{
  await  mongoose.connect(MONGO_URL);
};

const mongoDisconnect = async () =>{
  await  mongoose.disconnect();
};

export {mongoConnect, mongoDisconnect};