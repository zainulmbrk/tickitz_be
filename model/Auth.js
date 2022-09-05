const db = require('../helper/db_connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { useError } = require('../helper/message')

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT user_id, password, role, firstname, lastname, phone_number, username FROM users WHERE email='${email.toLowerCase()}'`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'error' })
          } else {
            if (!results.length) {
              reject({ message: 'wrong email or password' })
            } else {
              bcrypt.compare(password, results[0].password, function (
                err,
                result,
              ) {
                if (err) {
                  reject({ message: 'please try again' })
                }
                let token = jwt.sign(
                  {
                    user_id: results[0].user_id,
                    role: results[0].role,
                    firstname: results[0].firstname,
                  },
                  process.env.JWT_SECRET_KEY,
                )
                if (result) {
                  resolve({
                    message: 'login success',
                    status: 200,
                    data: {
                      token,
                      user_id: results[0].user_id,
                      role: results[0].role,
                      firstname: results[0].firstname,
                      lastname: results[0].lastname,
                      phone_number: results[0].phone_number,
                      username: results[0].username,
                    },
                  })
                } else {
                  reject({ message: 'wrong email or password' })
                }
              })

              // bcrypt.compare(password, resultsHash[0].password).then(function(result) {
              //     // if(err){reject({message:"please try again"})}
              //     // if(!result){reject({message:"please try again"})}
              //     let token = jwt.sign({ user_id: resultsHash[0].user_id, role: resultsHash[0].role}, process.env.JWT_SECRET_KEY);
              //     console.log(process.env.JWT_SECRET_KEY)
              //     if(result){
              //         resolve({
              //             message: "login success",
              //             status: 200,
              //             data: {
              //                 token,
              //                 user_id: resultsHash[0].user_id,
              //                 role: resultsHash[0].role
              //             }
              //         })
              //     }else{
              //         reject({message:"wrong email or password"})
              //     }
              // })
            }
          }
        },
      )
    })
  },

  register: (req, res) => {
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      phone_number,
    } = req.body
    // if(req.body.role){
    //     resolve({
    //         message:"access denied"
    //     })
    // }
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hashPassword) {
        if (err) {
          reject({ message: 'something error' })
        } else {
          db.query(
            `INSERT INTO users(firstname, lastname, email, username, password, phone_number) VALUES('${firstname}', '${lastname}', '${email}', '${username}', '${hashPassword}', '${phone_number}')`,
            (err, results) => {
              if (err) {
                console.log(err)
                reject(useError(err.code))
                // reject({message:"Email Already in Use"})
              }
              resolve({
                message: 'sign up success',
                status: 200,
                data: results,
              })
            },
          )
        }
      })
    })
  },
}
