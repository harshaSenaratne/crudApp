var mysql = require('mysql')
var db;
var settings = {
  host     : 'localhost',
  user     : 'root',
  password : 'sn0wle0pard1',
  database : 'crudapp'
};


function connectDatabase(){
    if(!db){
      db = mysql.createConnection(settings)

      db.connect(function(error){
        if(!error){
            console.log('Database connection successful');
        }
        else{
            console.log('Connection Error ');
        }
      })

      return db;

    }
 }

 module.exports =connectDatabase()