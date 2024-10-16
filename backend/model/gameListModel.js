const mongoose = require('mongoose')

const gameListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    }
});

const gameListModel = mongoose.model("GameList", gameListSchema);
module.exports = gameListModel;