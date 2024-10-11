const mongoose = require('mongoose')

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Bắt buộc phải có tên giải đấu
        trim: true // Loại bỏ khoảng trắng ở đầu và cuối
    },
    description: {
        type: String,
        trim: true
    },
    time: {
        type: Date,
        required: true
    }
}, {
    timestamps: true // Tự động thêm 'createdAt' và 'updatedAt'
});

const tournamentModel = mongoose.model("Tournament", tournament)
module.exports = tournamentModel