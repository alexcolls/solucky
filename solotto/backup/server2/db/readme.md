
# MongoDB comands 
> sudo systemctl status mongod
> sudo systemctl stop mongod
> sudo systemctl start mongod.service
> sudo systemctl restart mongod
> sudo systemctl disable mongod
> sudo systemctl enable mongod
> mongo --eval 'db.runCommand({ connectionStatus: 1 })'

# Clean cache
> sudo rm -rf /tmp/mongodb-27017.sock
> sudo service mongod start
> sudo service mongod status
