const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/comeback');
        console.log("Connected to database")
    } catch (e) {
        console.error('Database connection failed: ', error);
        process.exit(1); // Exit process with failure
    }
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = connect;