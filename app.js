const express = require('express')
const categories = require('./Routs/category')
const mongoose = require('mongoose')
const students = require('./Routs/student')
const app = express()

mongoose.connect('mongodb://127.0.0.1/appDatabase')
.then(()=>console.log('connection is succesfull Database'))
.catch(error=>console.error('not connect database',error))

app.use(express.json())
app.use(categories)
app.use(students)
const port = process.env.PORT || 8000
app.listen(port , ()=> console.log(`Running port in ${port} .....`))