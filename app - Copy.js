const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')

require('./models/user')

mongoose.connect(MONGOURI)

mongoose.connection.on('connected',()=>{
    console.log('db connected')
})

mongoose.connection.on('error',(err)=>{
    console.log('db error' , err)
})

// const customMiddleware = (req,res,next)=>{
//     console.log('middleware excuted')
//     next()
// }

// // for all the routes this middleware works
// app.use(customMiddleware)

// app.get('/',(req,res)=>{
//     res.send("hello worlds")
// })

// if we use single route middleware the code is like this
// app.get('/about',customMiddleware,(req,res)=>{
//     res.send("about page")
// })

app.listen(PORT,()=>{
    console.log("server is running on" , PORT)
})