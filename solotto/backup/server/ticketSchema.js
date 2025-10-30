const  mongoose  = require("mongoose");
const  Schema  =  mongoose.Schema;

const  ticketSchema  =  new Schema(
{   
  date: Date,
  hour: String,
  wallet: String,
  number: Number,
  verified: { type: Boolean },
  country: { type: String },
  flag: { type: String },
  twitter: { type: String },
},
{
  timestamps: true
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports  =  Ticket;