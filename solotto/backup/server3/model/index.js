'use strict';

const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://solucky_admin:!")!maxACO313!ñ@solucky.eyeidzp.mongodb.net/solucky?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    });



module.exports = mongoose;