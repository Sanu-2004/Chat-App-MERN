const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to the database');
    }
    catch(err){
        console.log("Error connecting to the database" + err.message);
    }
}

module.exports = {dbConnect};