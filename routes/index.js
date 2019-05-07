var express = require('express');
var router = express.Router();
var connection = require('../connection/connection')

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM user',function(err,rows){
    if(err) throw err;
    console.log('Responsed data ',rows);

    res.render('index', { users:rows});
  }
  )
});

//adds new user 
router.post('/addUser', function(req,res) {
 
  const userData = {
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    job:req.body.job
  }

  console.log('userdata',userData)
  
    connection.query("INSERT INTO user SET ?",userData, function(err,result){
      if(err) throw err;
      //redirects to the same page after data is inserted to db
      res.redirect('/');
    })
  
});

//delete user
router.get('/deleteUser/:id',function(req,res){

  var userid =req.params.id

  connection.query('DELETE FROM user WHERE id=?',[userid],function(err ,rows){
     if(err) throw err;
     res.redirect('/');  
  })
})


//fetches particular user data to set to edit user fields
router.get('/editUser/:id',function(req,res){
   var userid =req.params.id

   connection.query("SELECT * FROM user WHERE id =? ",[userid],function(err,rows){
     if(err) throw err;
     res.render('edit',{userData:rows});
   })
});


//update user data
router.post('/updateUser/:id',function(req,res){
  
   var fname=req.body.fname;
   var lname=req.body.lname;
   var email=req.body.email;
   var job=req.body.job;

   var updateID = req.params.id;

   connection.query("UPDATE user SET fname = ?, lname = ? ,email = ?, job = ? WHERE id=?",[fname,lname,email,job,updateID],function(err,respond){
     if(err) throw err;
     res.redirect('../../')
   })
});


module.exports = router;
