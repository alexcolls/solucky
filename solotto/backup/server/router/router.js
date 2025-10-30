const  express  = require("express");
const  connectdb  = require("../../server/dbconnect");
const  Tickets  = require("./../models/Chat");

const  router  =  express.Router();

router.route("/").get((req, res, next) =>  {
        res.setHeader("Content-Type", "application/json");
        res.statusCode  =  200;
        connectdb.then(db  =>  {
          Tickets.find({}).then(chat  =>  {
            res.json(chat);
        });
    });
});

module.exports  =  router;