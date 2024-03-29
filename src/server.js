require('express-async-errors')
require('dotenv/config')

const express = require('express')
const AppError = require('./utils/app_error')
const uploadConfig = require('./configs/uploads')

const cors = require('cors')
const routes = require('./routes')
const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER))

app.use(routes)

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status:'error',
      message: error.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: error.message
  })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`The server listening on port ${PORT}`))
