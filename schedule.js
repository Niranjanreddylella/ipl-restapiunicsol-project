var fs=require('fs')
var path=require('path')
var express=require('express');
var route=express.Router();
var promise=require('bluebird')
var bp=require('body-parser')
var options={promiseLib:promise}
var pgp=require('pg-promise')(options)

var route=express() 
 
 route.use(bp.urlencoded({extended:true}))
 route.use(bp.json())
        var cs="postgres://postgres:1234@localhost:5432/postgres";
 route.get('/',(req,res,next)=>{
     var myDb=pgp(cs)
     console.log("entered")
     myDb.any('select * from schedule').then((data)=>{
         res.send(data)
     })
     pgp.end()
 })

//  route.get('/:id',(req,res,next)=>{
//      var i=parseInt(req.params.id)
//     var myDb=pgp(cs)
//     myDb.any('select * from players where pid=$1',i).then((data)=>{
//         res.send(data)
//     })
//     pgp.end()
// })

 route.delete('/:venue',(req,res,next)=>{
     var v=req.params.venue
     var myDb=pgp(cs)
     myDb.none('delete from schedule where venue=$1',v).then((data)=>{
         res.send({"message":"deleted successfully"})
     })
     pgp.end()
 })

route.post('/',(req,res,next)=>{
   var d=req.body.date
    var v=req.body.venue
    var m=req.body.matchdetails
 var myDb=pgp(cs)
   myDb.none("insert into schedule values($1,$2,$3)",[d,v,m]).then((data)=>{
       res.send({"message":"inserted succesfully"})
   })
   pgp.end()
})
// route.put('/',(req,res,next)=>{
//     var i=req.body.pid
//     var nm=req.body.pname
//     var m=req.body.matches
//     var r=req.body.runs
//     var b=req.body.best_score
//     var t=req.body.team
//     var pi=req.body.pimage
// var myDb=pgp(cs)
//    myDb.none("update players set pname=$1,matches=$2,runs=$3,best_score=$4,team=$5,pimage=$6 where pid=$7",[nm,m,r,b,t,pi,i]).then((data)=>{
//        res.send({"message":"updated succesfully"})
//    })
//    pgp.end()
// })
module.exports=route;