const mongoose = require('mongoose')

const connect = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to database")
    } catch (e) {
        console.error('Database connection failed: ', e);
    }
}

module.exports = connect;