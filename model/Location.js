const db = require('../helper/db_connection')

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      //   const { gen_name } = req.params;
      db.query(
        `SELECT location_id, city, cinema_name FROM location LEFT JOIN cinema ON location.cinema_id = cinema.cinema_id`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'ada error' })
          }
          resolve({
            message: 'get all from location success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },

  getById: (req, res) => {
    return new Promise((resolve, reject) => {
      const { location_id } = req.params
      db.query(
        `SELECT location_id, city, cinema_name FROM location LEFT JOIN cinema ON location.cinema_id = cinema.cinema_id WHERE location_id = '${location_id}'`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'ada error' })
          }
          let dataparse = results.map((item) => {
            return {
              ...item,
              cinema_name: item.cinema_name.split(','),
            }
          })
          resolve({
            message: 'get location success',
            status: 200,
            data: dataparse,
          })
        },
      )
    })
  },

  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { city } = req.body

      db.query(
        `INSERT INTO location(city) VALUES ('${city}')`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'error' })
          }
          resolve({
            message: 'add location success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },

  update: (req, res) => {
    return new Promise((resolve, reject) => {
      //   const { movies_id } = req.params;
      db.query(
        `SELECT * FROM genres WHERE genre_id=${genre_id}`,
        (err, results) => {
          if (err) {
            res.send({ message: 'ada error' })
          }

          const previousData = {
            ...results[0],
            ...req.body,
          }
          const { gen_name } = previousData

          db.query(
            `UPDATE genres SET gen_name='${gen_name}' WHERE genre_id='${genre_id}'`,
            (err, results) => {
              if (err) {
                console.log(err)
                reject({ message: 'ada error' })
              }
              resolve({
                message: 'update genres success',
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
      const { movies_id } = req.params
      db.query(
        `DELETE FROM movies where movies_id=${movies_id}`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'ada error' })
          }
          resolve({
            message: 'delete movies success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },
}
