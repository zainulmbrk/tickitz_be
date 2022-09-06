const express = require('express')
const multer = require('multer')
const app = express()
const path = require('path')

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

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname)

  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return cb(new Error('Only images are allowed'), 'test')
  }
  cb(null, true)
}

const limits = {
  fileSize: 1 * 2024 * 2024,
}

const uploadCover = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).single('cover')

const uploads = (req, res, next) => {
  uploadCover(req, res, (err) => {
    if (err) {
      return res.json({
        message: err.message,
      })
    } else if (err) {
      return res.json({
        message: 'Failed to upload image!',
      })
    }
    next()
  })
}

// const uploads = ({
//   uploadCover: (req, file, cb) => {
//     if (
//       file.mimetype == 'image/png' ||
//       file.mimetype == 'image/jpg' ||
//       file.mimetype == 'image/jpeg'
//     ) {
//       cb(null, true)
//     } else {
//       cb(null, false)
//       return req.res.send({ message: 'extension wrong' })
//     }
//   },
// })

module.exports = uploads
