require('dotenv').config();

const app = require('./App');
const ConnectDB = require('./DB/Database');

//Handling uncaught errors
process.on("uncaughtException", (err) => {//refer book
    console.log(`Error: ${err.message}`);
    console.log('Oops! handling uncaught exception');
});


ConnectDB();

const port = process.env.PORT || 3006
const server = app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})



//unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`shutting down server due to ${err.message}`);
    server.close(() => {
        process.exit(1);//immeditely closes server if any unhandled rejection occurs
    });
    
});



