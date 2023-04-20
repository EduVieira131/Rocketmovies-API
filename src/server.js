const express = require('express')
const AppError = require('./utils/app_error')
const routes = require('./routes')


const app = express()
app.use(express.json())

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status:'error',
      message: error.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

const PORT = 3000
app.listen(PORT, () => console.log(`The server listening on port ${PORT}`))
