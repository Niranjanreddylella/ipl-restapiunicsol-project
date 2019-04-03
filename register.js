


var fs=require('fs')
var path=require('path')
var express=require('express')
var promise=require('bluebird')
var bp=require('body-parser')
var options={promiseLib:promise}
var pgp=require('pg-promise')(options)
var route=express.Router()
var route=express()
  
 
 route.use(bp.urlencoded({extended:true}))
 route.use(bp.json())
 var cs = 'postgres://postgres:root@localhost:5432/postgres'


 route.get('/',(req,res,next)=>{
     var myDb=pgp(cs)
     myDb.any('select * from register').then((data)=>{
         res.send(data)
     })
     pgp.end()
 })

 route.get('/:id',(req,res,next)=>{
     var i=req.params.id
    var myDb=pgp(cs)
    myDb.any('select * from register where userid=$1',i).then((data)=>{
        res.send(data)
    })
    pgp.end()
})
route.get('/:id/:ip',(req,res,next)=>{
    var i=req.params.id;
    var p=req.params.ip;
   var myDb=pgp(cs)
   myDb.any('select * from register where userid=$1 and password=$2',[i,p]).then((data)=>{
       res.send(data)
   })
   pgp.end()
})

 route.delete('/:id',(req,res,next)=>{
     var i=(req.params.id)
     var myDb=pgp(cs)
     myDb.none('delete from register where userid=$1',i).then((data)=>{
         res.send({"message":"deleted successfully"})
     })
     pgp.end()
 })

route.post('/',(req,res,next)=>{
    var i=req.body.userid
    var nm=req.body.username
    var p=req.body.password
    var ph=req.body.phone

    
   var myDb=pgp(cs)
   myDb.none("insert into register(userid,password,phone) values($1,$2,$3)",[i,p,ph]).then((data)=>{
       res.send({"message":"inserted succesfully"})
   })
   pgp.end()
})
route.put('/',(req,res,next)=>{
    var i=req.body.userid
    var nm=req.body.username
    var p=req.body.pasword
    var ph=req.body.phone
    


var myDb=pgp(cs)
   myDb.none("update register set username=$1,password=$2,phone=$3 where userid=$4",[nm,p,ph,i]).then((data)=>{
       res.send({"message":"updated succesfully"})
   })
   pgp.end()
})
module.exports=route