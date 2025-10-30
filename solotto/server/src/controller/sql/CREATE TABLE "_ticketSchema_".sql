CREATE TABLE "_ticketSchema_" ( 
  _hour varchar(21),
  __num__ int PRIMARY KEY,
  _verified boolean,
  _account varchar(255),
  _owner varchar(255),
  _flag varchar(11), 
  _pot int,
  _timestamp bigint
);

-- DROP TABLE "_ticketSchema_"