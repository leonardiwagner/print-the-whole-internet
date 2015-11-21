'use strict';

let redis = require("redis").createClient({'host': 'redis', 'port': 6379});

let set = (queueName, key) => {
  return new Promise((resolve, reject) => {
    redis.rpush(queueName, key, (err, reply) => {
      if(err) reject(err);
      resolve(reply);
    });
  });
};

let setContent = (queueName, key, value) => {
  return new Promise((resolve, reject) => {
    redis.exists(key,(err, reply) => {
      if(err) reject(err);
      if(reply === 1) return reject(key + " already processed")
      return;
      redis.set(key, value, (err, reply) => {
        if(err) reject(err);
        redis.rpush(queueName, key, (err, reply) => {
          if(err) reject(err);
          resolve(reply);
        });
      });
    });
  });
};



let get = (queueName) => {
  return new Promise((resolve, reject) => {
    redis.lpop(queueName, (err, key) => {
      if(err) reject(err);
      if(key === null) reject("No items in " + queueName + " queue");
    });
  });
};

let getContent = (queueName) => {
  return new Promise((resolve, reject) => {
    redis.lpop(queueName, (err, key) => {
      if(err) reject(err);
      if(key === null) reject("No items in " + queueName + " queue");
      redis.get(key, (err, value) => {
        if(err) reject(err);
        redis.del(key, (err, reply) => {
          if(err) reject(err);
          resolve(value)
        });
      });
    });
  });
};

module.exports = {
  set: set,
  get: get,
  setContent: setContent,
  getContent: getContent
}