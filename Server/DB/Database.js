const mongoose = require('mongoose');

const ConnectDB = () => {

    mongoose.connect(process.env.MONGO_URL, {})
        .then((data) => {
            console.log(`MongoDb connected with server:${data.connection.host}`);
          
        });
}

module.exports = ConnectDB;