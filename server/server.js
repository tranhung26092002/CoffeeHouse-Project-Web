const express = require('express');
const app = express();
const cors = require('cors');

const userRouter = require('./Router/UserRouter');
const authRouter = require('./Router/AuthRouter');
const foodRouter = require('./Router/FoodRouter');

const connectDb = require('./Services/ConnectDbServices');


require('dotenv').config()

//middleware apply cors add all request
app.use(cors());
//middleware get infor from client by req.body
app.use(express.json());

//connect database
connectDb();

// middleware router
app.use('/api/auth', authRouter);
app.use('/auth/admin', userRouter);
app.use('/auth/user', foodRouter);

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));