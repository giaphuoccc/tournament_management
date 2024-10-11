require('dotenv').config(); // Sử dụng dotenv để quản lý biến môi trường
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000; // Lấy cổng từ biến môi trường hoặc mặc định là 3000


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Xuất module connectDB nếu cần sử dụng ở nơi khác
module.exports = connectDB;
