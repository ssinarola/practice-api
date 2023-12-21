const express = require('express')
const cors = require('cors')
const mainRoute = require('./routes/index')
require('dotenv').config()

const app = express()

// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json())

// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// for parsing multipart/form-data
// app.use(upload.single())

// access from borwesr for static folder "public" files
// eg http://localhost:5000/uploads/1701420504554-camera.jpg try to access this from browser it will not allow but once add static path with public it will allow.
app.use(express.static('public'))

app.use('/api', mainRoute)

// Global Errors handling -
app.use((err, req, res, next) => {
  console.log(
    '------------ globally --------------------->>>>>>>>>',
    JSON.stringify(err),
    '-------------',
    err.statusCode,
    '-------------',
    err.status
  )
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'Something Went Wrong' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`)
  // once server on then should proceed to connect DB
  require('./config/mongoDb')
})
