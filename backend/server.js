import dotenv from 'dotenv' // Sử dụng dotenv để quản lý biến môi trường
import cors from 'cors'
import express from 'express'

import { connectDB } from './config/db.js'

import tournamentRoute from './routes/tournamentRoute.js'
import gameListRoute from './routes/gameListRoute.js'

const app = express();
app.use(express.json());
app.use(cors());

//load environment variable
dotenv.config();

//Connect Database
connectDB();

//Routes
app.use('/client/tournament', tournamentRoute);
app.use('/client/game', gameListRoute);


const PORT = process.env.PORT || 5000; // Lấy cổng từ biến môi trường hoặc mặc định là 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
