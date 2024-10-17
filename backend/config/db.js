import mongoose from 'mongoose';
import Tournament from '../model/tournamentModel.js';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URI_MONGODB, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

