const db = require('../helper/db_connection')

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      //   const { gen_name } = req.params;
      db.query(`SELECT * FROM genres`, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: 'ada error' })
        }
        // let dataparse = results.map((item) => {
        //   return {
        //     ...item,
        //     gen_name: JSON.parse(item.gen_name),
        //   };
        // });
        resolve({
          message: 'get all from genres success',
          status: 200,
          data: results,
        })
      })
    })
  },

  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { gen_name } = req.body

      db.query(
        `INSERT INTO genres(gen_name) VALUES ('${gen_name}')`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'error' })
          }
          resolve({
            message: 'add genres success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },

  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { genre_id } = req.params
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
      const { genre_id } = req.params
      db.query(
        `DELETE FROM genres where genre_id=${genre_id}`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'ada error' })
          }
          resolve({
            message: 'delete genre success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },
}
