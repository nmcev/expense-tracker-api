const express = require("express");
const app = express();
const connectToMongoDB = require("./mongoConfig");
const logRequests = require('./middleware/LogRequests')

// error middleware 
const errorMiddleware = require('./middleware/errorMiddleware')
// routes
const authRoute = require('./routes/auth');

// parse incoming json
app.use(express.json());

//log requests
app.use(logRequests);

//connect to db
connectToMongoDB()


app.use('/api', authRoute);

//error middleware
app.use(errorMiddleware)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`)
});