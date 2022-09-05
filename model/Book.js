// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')
const moment = require('moment')
module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM book`, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: 'error' })
        }
        resolve({
          message: 'get order success',
          status: 200,
          data: results,
        })
      })
    })
  },

  getById: (req, res) => {
    return new Promise((resolve, reject) => {
      const { book_id } = req.params
      db.query(
        `SELECT title, cinema_name, book_date, time, ticket_of_number, price, ticket_of_number*price AS total_payment FROM book 
        INNER JOIN movies ON book.movies_id = movies.movies_id 
        INNER JOIN cinema ON book.cinema_id = cinema.cinema_id 
        WHERE book_id='${book_id}'`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'error' })
          }
          resolve({
            message: 'get order success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },
  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const {
        movies_title,
        cinema_name,
        book_date,
        time,
        ticket_of_number,
        price,
      } = req.body
      db.query(
        `INSERT INTO book(movies_title, cinema_name, price) 
        VALUES('${movies_title}', '${cinema_name}', '${price}')`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'ada error' })
          }
          resolve({
            message: 'add new book success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },
  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { book_id } = req.params
      db.query(
        `SELECT * FROM book WHERE book_id='${book_id}'`,
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
            book_date,
            time,
            ticket_of_number,
          } = previousData
          moment(book_date).format('YYYY-MM-DD')
          db.query(
            `UPDATE book SET movies_id='${movies_id}', cinema_id='${cinema_id}', book_date='${book_date}', time='${time}', ticket_of_number='${ticket_of_number}' WHERE book_id='${book_id}'`,
            (err, results) => {
              if (err) {
                console.log(err)
                reject({ message: 'ada error' })
              }
              resolve({
                message: 'update book success',
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
      const { book_id } = req.params
      db.query(`DELETE FROM book WHERE book_id=${book_id}`, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: 'ada error' })
        }
        resolve({
          message: 'delete book success',
          status: 200,
          data: results,
        })
      })
    })
  },
}
