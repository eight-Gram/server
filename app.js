require('dotenv').config()
const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routers/user_routers')
const postRouter = require('./routers/post_router')
const fs = require('fs')

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds259820.mlab.com:59820/eight-gram`, () => {
    console.log('successfully connected to db')
})
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`)
})