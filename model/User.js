const db = require('../helper/db_connection')
const fs = require('fs')

module.exports = {
  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { user_id } = req.params
      db.query(
        `SELECT * FROM users where user_id=${user_id}`,
        (err, resultsData) => {
          if (err) {
            res.send({ message: 'ada error' })
          }

          // fs.unlink(`./uploads/${resultsData[0].cover}`, function (err) {
          //   if (err)
          //     resolve({
          //       message: 'update movies success',
          //       status: 200,
          //       data: resultsData,
          //     })
          // })

          const previousData = {
            ...resultsData[0],
            ...req.body,
          }
          const { firstname, lastname, phone_number } = previousData

          db.query(
            `UPDATE users SET firstname='${firstname}', lastname='${lastname}', phone_number='${phone_number}' WHERE user_id=${user_id}`,
            (err, results) => {
              if (err) {
                console.log(err)
                reject({ message: 'ada error' })
              }
              resolve({
                message: 'update success',
                status: 200,
                data: results,
              })
            },
          )
        },
      )
    })
  },
}
