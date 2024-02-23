const mongoose = require('mongoose');
const sessionModel = require('../models/sessionModel'); // Updated import path

const connectDB = async () => {
    try {
        await mongoose.connect(
           `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.9q8kp4s.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
        );
        
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {connectDB,sessionModel};
//לברר איפה צריך לשים את זה בגלל שהיא רשמה במצגת 6.3 שלא צריך יותר תיקיה בשם  דאתה
//לברר על הconfig !!!
