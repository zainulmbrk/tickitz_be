// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')
const moment = require('moment')

module.exports = {
  createNewSchedule: (req, res) => {
    return new Promise((resolve, reject) => {
      const {
        movies_id,
        cinema_id,
        location_id,
        price,
        time_id,
        date_start,
        date_end,
      } = req.body

      db.query(
        `INSERT INTO schedule(movies_id, cinema_id, location_id, price, time_id, date_start, date_end) VALUES 
           ('${movies_id}','${cinema_id}','${location_id}','${price}', '${time_id}', '${date_start}', '${date_end}')`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'ada error' })
          }
          resolve({
            message: 'add new schedule success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },

  get: (req, res) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT schedule.*, movies.*, cinema_name, image, location.*, showtime.* FROM schedule LEFT JOIN movies ON schedule.movies_id = movies.movies_id
      LEFT JOIN cinema ON schedule.cinema_id = cinema.cinema_id
      LEFT JOIN location ON schedule.location_id = location.location_id
      LEFT JOIN showtime ON schedule.time_id = showtime.time_id`
      db.query(
        sql,

        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'error' })
          }

          let dataparse = results.map((item) => {
            return {
              ...item,
              prime_time: item.prime_time.split(','),
            }
          })

          resolve({
            message: 'get schedule success',
            status: 200,
            data: dataparse,
          })
        },
      )
    })
  },

  getById: (req, res) => {
    return new Promise((resolve, reject) => {
      const { schedule_id } = req.params
      db.query(
        `SELECT title, cinema_name, city, price, prime_time, date_start, date_end FROM schedule 
        INNER JOIN movies ON schedule.movies_id = movies.movies_id 
        INNER JOIN cinema ON schedule.cinema_id = cinema.cinema_id
        INNER JOIN showtime ON schedule.time_id = showtime.time_id
        INNER JOIN location ON schedule.location_id = location.location_id WHERE schedule_id='${schedule_id}'`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'error' })
          }
          resolve({
            message: 'get schedule By Id Success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },

  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { schedule_id } = req.params
      db.query(
        `SELECT * FROM schedule where schedule_id=${schedule_id}`,
        (err, results) => {
          if (err) {
            res.send({ message: 'ada error' })
          }

          const previousData = {
            ...results[0],
            ...req.body,
          }
          const {
            movies_id,
            cinema_id,
            location_id,
            price,
            time_id,
            date_start,
            date_end,
          } = previousData

          db.query(
            `UPDATE schedule SET movies_id='${movies_id}',
            cinema_id='${cinema_id}', location_id='${location_id}', price='${price}', time_id='${time_id}',
            date_start='${date_start}',
            date_end='${date_end}' WHERE schedule_id='${schedule_id}'`,
            (err, results) => {
              if (err) {
                console.log(err)
                reject({ message: 'ada error' })
              }
              resolve({
                message: 'update schedule success',
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
      const { schedule_id } = req.params
      db.query(
        `DELETE FROM schedule where schedule_id=${schedule_id}`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'ada error' })
          }
          resolve({
            message: 'delete schedule success',
            status: 200,
            data: {
              schedule_id: results.insertId,
              ...req.body,
            },
          })
        },
      )
    })
  },
}
