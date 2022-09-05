const express = require('express')
const multer = require('multer')
const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
    // cb(null, file.originalname)
  },
})

const uploads = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return req.res.send({ message: 'extension wrong' })
    }
  },
})

// const uploadImage = uploads.single('cover')
// app.post('/uploads', uploads.single('cover'), (req, res) {
//   const
// })

module.exports = uploads
