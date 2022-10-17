import express from "express";
import cors from 'cors'
import morgan from "morgan";

const app = express();

app.use(cors({origin: '*'}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/api/v1',(req, res) =>{
    return res.status(200).json({message: "Welcome to Sami Hospital Managment System!"})
});

export default app;