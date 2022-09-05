// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')

module.exports = {
  createNewTime: (req, res) => {
    return new Promise((resolve, reject) => {
      const { prime_time } = req.body

      db.query(
        `INSERT INTO showtime(prime_time) VALUES ('${prime_time}')`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'error' })
          }
          resolve({
            message: 'add cinema success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      // const { time_id } = req.params;
      db.query(`SELECT * FROM showtime`, (err, results) => {
        if (err) {
          reject({ message: 'error' })
        }
        resolve({
          message: 'get time success',
          status: 200,
          data: results,
        })
      })
    })
  },
  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { time_id } = req.params
      db.query(`SELECT * FROM showtime`, (err, results) => {
        if (err) {
          res.send({ message: 'ada error' })
        }

        const previousData = {
          ...results[0],
          ...req.body,
        }
        const { prime_time } = previousData

        db.query(
          `UPDATE showtime SET prime_time='${prime_time}' WHERE time_id='${time_id}'`,
          (err, results) => {
            if (err) {
              console.log(err)
              reject({ message: 'ada error' })
            }
            resolve({
              message: 'update prime_time success',
              status: 200,
              data: results,
            })
          },
        )
      })
    })
  },
  remove: (req, res) => {
    return new Promise((resolve, reject) => {
      const { time_id } = req.params
      db.query(
        `DELETE FROM showtime where time_id=${time_id}`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'ada error' })
          }
          resolve({
            message: 'delete schedule success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },
}
