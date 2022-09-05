require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = 9511
const bodyParser = require('body-parser')
const router = require('./routes')
const path = require('path')
const { getAllSchedule } = require('./controller/scheduleController')

// const corsOptions = {
//   origin: "localhost:3000",
//   optionsSuccessStatus: 200,
//   method: "GET",
// };
app.use(cors())

// app.use(cors(corsOptions));
//cara pertama kita input kita ada di json (di postman: body > Raw > Type = JSON)
app.use(bodyParser.json())
//www-url-form-encoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// router(app, '/api/v1',)
app.use('/api/v5', router)
app.get('/schedule', getAllSchedule)

app.listen(port, () => {
  console.log(`Tickitz Backend listening on port ${port}`)
})
