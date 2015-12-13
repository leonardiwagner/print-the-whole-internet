'use strict';

let redis = require("redis").createClient({'host': 'redis', 'port': 6379});

let keyAlreadyExists = (queueName, key) => {
  return new Promise((resolve, reject) => {
    redis.exists(key, (err, reply) => {
      if (err)         return reject(err);
      if (reply === 1) return resolve(true);
      return resolve(false);
    });
  });
};

let setContent = (key, value) => {
  return new Promise((reject, resolve) => {
    redis.set(key, value, (err, reply) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

let setKeyIntoQueue = (queueName, key) => {
  return new Promise((resolve, reject) => {
    redis.rpush(queueName, key, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    });
  });
};

module.exports = function(queueName){
  return {
    set: (key, value) => {
      return keyAlreadyExists(queueName, key)
        .then((exists) => {
          if (!exists) setContent(key, value);
          else         throw "key " + key + " already exists in queue!";
        }).then(() => {
          setKeyIntoQueue(queueName, key)
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
