'use strict';

let queue = require("rediskill")('redis', 6379);

module.exports = function(queueName){
  return {
    set: (key, value) => {
      return keyAlreadyExists(key)
        .then((exists) => {
          if (!exists) return setContent(key, value)
          //else         throw "key " + key + " already exists in queue!";
        }).then(() => {
          return setKeyIntoQueue(queueName, value)
        }).catch(err => {
          throw err;
        });
    },
    get: () => {
      return new Promise((resolve, reject) => {
        redis.lpop(queueName, (err, key) => {
          if (err) reject(err);
          if (key === null) resolve(undefined);
          resolve(key);
        });
      });
    }
  }
};
