const db = require("../helper/db_connection");

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      const { seat_id } = req.params;
      db.query(`SELECT * FROM typeseat`, (err, results) => {
        if (err) {
          console.log(err);
          reject({ message: "error" });
        }
        resolve({
          message: "get seattype success",
          status: 200,
          data: results,
        });
      });
    });
  },
  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { seat_type } = req.body;

      db.query(
        `INSERT INTO book(seat_type) 
        VALUES('${seat_type}')`,
        (err, results) => {
          if (err) {
            console.log(err);
            reject({ message: "ada error" });
          }
          resolve({
            message: "add new seat success",
            status: 200,
            data: results,
          });
        }
      );
    });
  },
  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { movies_id } = req.params;
      db.query(
        `SELECT * FROM book where movies_id=${movies_id}`,
        (err, results) => {
          if (err) {
            res.send({ message: "ada error" });
          }

          const previousData = {
            ...results[0],
            ...req.body,
          };
          const {
            title,
            cover,
            release_date,
            director,
            description,
            casts,
            categories,
          } = previousData;

          db.query(
            `UPDATE book SET title='${title}', cover='${cover}', release_date='${release_date}', director='${director}', description='${description}', casts='${casts}', categories='${categories}'`,
            (err, results) => {
              if (err) {
                console.log(err);
                reject({ message: "ada error" });
              }
              resolve({
                message: "update book success",
                status: 200,
                data: results,
              });
            }
          );
        }
      );
    });
  },
  remove: (req, res) => {
    return new Promise((resolve, reject) => {
      const { movies_id } = req.params;
      db.query(
        `DELETE FROM book where movies_id=${movies_id}`,
        (err, results) => {
          if (err) {
            reject({ message: "ada error" });
          }
          resolve.send({
            message: "delete book success",
            status: 200,
            data: results,
          });
        }
      );
    });
  },
};
