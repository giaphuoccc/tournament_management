import dotenv from 'dotenv' // Sử dụng dotenv để quản lý biến môi trường
import express from 'express'
import { connectDB } from './config/db.js'
import tournamentRoutes from './routes/tournamentRoute.js'

const app = express();
app.use(express.json());

//load environment variable
dotenv.config();

//Connect Database
connectDB();

//Routes
app.use('/client/tournament', tournamentRoutes);


const PORT = process.env.PORT || 5000; // Lấy cổng từ biến môi trường hoặc mặc định là 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
