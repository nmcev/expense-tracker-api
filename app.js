const express = require("express");
const app = express();
const connectToMongoDB = require("./mongoConfig");
const cors = require('cors')
const morgan = require('morgan')

// error middleware 
const errorMiddleware = require('./middleware/errorMiddleware')
// routes
const authRoute = require('./routes/auth');
const expenseRoute = require('./routes/expense');

// parse incoming json
app.use(express.json());

// use cors
const corsOptions = {
    origin: ['http://localhost:5173']
}

app.use(cors(corsOptions))



app.use(morgan('dev'));
//connect to db
connectToMongoDB()


app.use('/api', authRoute);
app.use('/api/expense', expenseRoute);

//error middleware
app.use(errorMiddleware)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
});