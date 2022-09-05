// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')
const fs = require('fs')

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      const {
        title = '',
        director = '',
        sortby = 'release_date',
        limit = 8,
        page = 1,
      } = req.query
      const offset = (page - 1) * limit

      const sql = `SELECT * FROM movies ${
        title
          ? `WHERE title LIKE '%${title}%'`
          : title && director
          ? `WHERE title LIKE '%${title}%' AND director LIKE '%${director}%'`
          : ''
      } ORDER BY ${
        sortby ? sortby : 'release_date'
      } DESC, title ASC LIMIT ${limit} OFFSET ${offset}`
      db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: ' error' })
        }
        // let dataparse = results.map((item) => {
        //   return {
        //     ...item,
        //     casts: item.casts.split(','),
        //   }
        // })
        // resolve({
        //   message: 'Get All From Movies Success',
        //   status: 200,
        //   data: {
        //     results: results,
        //   },
        // })
        else {
          db.query(`SELECT movies_id FROM movies`, (err, result) => {
            if (err) {
              console.log(err)
              reject({
                message: 'Something wrong',
              })
            } else {
              totalPage = Math.ceil(result.length / limit)
              if (page > totalPage) {
                reject({
                  message: 'Page not found!',
                  status: 404,
                  data: [],
                })
              }
              resolve({
                message: 'Get All From Movies Success',
                status: 200,
                data: {
                  totalRow: results.length,
                  totalPage: totalPage,
                  results: results,
                },
              })
            }
          })
        }
      })
    })
  },
  // getAll: (req, res) => {
  //   return new Promise((resolve, reject) => {
  //     // const { movies_id } = req.params
  //     db.query(
  //       `SELECT title, cover, release_date, director, description casts, gen_name FROM movies
  //       LEFT JOIN genres ON movies.genre_id = genres.genre_id`,
  //       (err, results) => {
  //         if (err) {
  //           reject({
  //             message: "ada error",
  //           })
  //         }
  //         resolve({
  //           message: "get movies All Success",
  //           status: 200,
  //           data: results,
  //         })
  //       }
  //     )
  //   })
  // },

  getDetails: (req, res) => {
    return new Promise((resolve, reject) => {
      const { movies_id } = req.params
      db.query(
        `SELECT * FROM movies WHERE movies_id='${movies_id}'`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({
              message: 'name not found',
              status: 400,
            })
          }
          // let dataparse = results.map((item) => {
          //   return {
          //     ...item,
          //     gen_name: JSON.parse(item.gen_name),
          //   }
          // })
          resolve({
            message: 'Detail Movies',
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
        title,
        cover,
        release_date,
        hours,
        minutes,
        director,
        description,
        casts,
        genre,
      } = req.body

      db.query(
        `INSERT INTO movies(title, genre, cover, release_date, hours, minutes, director, description, casts) VALUES('${title}','${genre}', '${cover}','${release_date}','${hours}','${minutes}','${director}','${description}','${casts}')`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'error' })
          }

          resolve({
            message: 'add new movies success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },
  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { movies_id } = req.params
      db.query(
        `SELECT * FROM movies where movies_id=${movies_id}`,
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
          const {
            title,
            cover,
            release_date,
            hours,
            minutes,
            director,
            description,
            casts,
            genre,
          } = previousData

          const tempImg = resultsData[0].cover

          if (req.body.cover) {
            fs.unlink(`uploads/${tempImg}`, function (err) {
              if (err) {
                console.log(err)
                resolve({
                  message: 'Update Movies Success',
                  status: 200,
                  data: resultsData,
                })
              }
            })
          }

          db.query(
            `UPDATE movies SET title='${title}', cover='${cover}', release_date='${release_date}', hours='${hours}', minutes='${minutes}', director='${director}', description='${description}', casts='${casts}', genre='${genre}' WHERE movies_id=${movies_id}`,
            (err, results) => {
              if (err) {
                console.log(err)
                reject({ message: 'ada error' })
              }
              resolve({
                message: 'update movies success',
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
        `SELECT cover FROM movies WHERE movies_id=${movies_id}`,
        (err, resultData) => {
          if (err) {
            console.log(err)
          }
          if (!resultData.length) {
            reject({ message: 'id not found' })
          } else {
            let coverTemp = resultData[0].cover
            db.query(
              `DELETE FROM movies where movies_id=${movies_id}`,
              (err, results) => {
                if (err) {
                  reject({ success: false })
                }
                fs.unlink(`./uploads/${coverTemp}`, function (err) {
                  if (err)
                    resolve({
                      success: true,
                      message: 'Delete Movies Success',
                      data: results,
                    })
                })
                resolve({
                  success: true,
                  message: 'Delete Movies Success',
                  data: results,
                })
              },
            )
          }
        },
      )
    })
  },
}
