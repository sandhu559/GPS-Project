if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
};

const mongoose = require("mongoose");

async function connectToDb() {

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("its working")
    } catch (err)
    {
        console.log(err)
    }
       
}



module.exports = connectToDb;
