const  mongoose  = require("mongoose");
mongoose.Promise  = require("bluebird");
const host = '127.0.0.1';
const url = `mongodb://${host}:27017/ticket`;
const connect = mongoose.connect(url, { useNewUrlParser: true });
module.exports = connect;