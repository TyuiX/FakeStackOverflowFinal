const mongodb = require("mongodb").MongoClient

mongodb.connect("mongodb://127.0.0.1:27017/a_session_ex", { useUnifiedTopology: true }, function (err, client) {
  module.exports = client
  const app = require("./server.js")
})
