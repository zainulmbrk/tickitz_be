const db = require('../helper/db_connection')
const fs = require('fs')
module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      // const { cinema_id } = req.params;
      db.query(`SELECT * FROM cinema`, (err, results) => {
        if (err) {
          reject({ message: 'ada error' })
        }
        resolve({
          message: 'get all from cinema success',
          status: 200,
          data: results,
        })
      })
    })
  },

  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { cinema_name, image } = req.body

      db.query(
        `INSERT INTO cinema(cinema_name, image) VALUES ('${cinema_name}', '${image}')`,
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

  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { cinema_id } = req.params
      db.query(
        `SELECT * FROM cinema WHERE cinema_id='${cinema_id}'`,
        (err, results) => {
          if (err) {
            res.send({ message: 'ada error' })
          }

          const previousData = {
            ...results[0],
            ...req.body,
          }
          const { cinema_name, image } = previousData
          const tempImg = results[0].image

          if (req.body.image) {
            fs.unlink(`uploads/${tempImg}`, function (err) {
              if (err) {
                console.log(err)
                resolve({
                  message: 'Update Movies Success',
                  status: 200,
                  data: results,
                })
              }
            })
          }

          db.query(
            `UPDATE cinema SET cinema_name='${cinema_name}', image='${image}' WHERE cinema_id='${cinema_id}'`,
            (err, results) => {
              if (err) {
                console.log(err)
                reject({ message: 'ada error' })
              }
              resolve({
                message: 'update cinema success',
                status: 200,
                data: results,
              })
            },
          )
        },
      )
    })
  },

  remove: (req, res) => {
    return new Promise((resolve, reject) => {
      const { cinema_id } = req.params
      db.query(
        `DELETE FROM cinema WHERE cinema_id=${cinema_id}`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'ada error' })
          }
          resolve({
            message: 'delete cinema success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },
}
