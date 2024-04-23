const app = require('./App');
const ConnectDB = require('./DB/Database');

//Handling uncaught errors
process.on("uncaughtException", (err) => {//refer book
    console.log(`Error: ${err.message}`);
    console.log('Oops! handling uncaught exception');
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(err);
    console.log(`shutting down server due to ${err.message}`);
    server.close(() => {
        process.exit(1);//immeditely closes server if any unhandled rejection occurs
    });
    
});


//config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require("dotenv").config({
        path:'Config/.env'
    })
}



ConnectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is listening on ${process.env.PORT}`);
})