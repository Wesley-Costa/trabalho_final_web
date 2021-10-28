const api = require('../../database/connection')

module.exports =  function login (user, pass) {
    return new Promise((resolve, reject) => {
      api.users.findOne({ user, pass }, (err, user) => {
        if (err)
          reject({
            message: 'We could not log you in. Reason: ' + err.message
          })
        
        if (!user)
          reject({
            message: 'User does not exists'
          })
        
        resolve(user)
      })
    })
  }