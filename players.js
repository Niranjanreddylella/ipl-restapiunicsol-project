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
 var cs = 'postgres://postgres:root@localhost:5432/postgres'
 route.get('/',(req,res,next)=>{
     var myDb=pgp(cs)
     myDb.any('select * from players').then((data)=>{
         res.send(data)
     })
     pgp.end()
 })

 route.get('/:id',(req,res,next)=>{
     var i=parseInt(req.params.id)
    var myDb=pgp(cs)
    myDb.any('select * from players where pid=$1',i).then((data)=>{
        res.send(data)
    })
    pgp.end()
})
route.get('/team/:id',(req,res,next)=>{
    var i=req.params.id
    console.log(i)
   var myDb=pgp(cs)
   myDb.any('select * from players where team=$1',i).then((data)=>{
       res.send(data)
   })
   pgp.end()
})

 route.delete('/:id',(req,res,next)=>{
     var i=req.params.id
     var myDb=pgp(cs)
     myDb.none('delete from players where pid=$1',i).then((data)=>{
         res.send({"message":"deleted successfully"})
     })
     pgp.end()
 })

route.post('/',(req,res,next)=>{
   var i=req.body.pid
    var nm=req.body.pname
    var m=req.body.matches
    var r=req.body.runs
    var b=req.body.best_score
    var t=req.body.team
    var pi=req.body.pimage
    var dt = new Date();
    fName = dt.getFullYear() + '_' + dt.getMonth() + '_' + dt.getDate() + '_' + dt.getHours() + '_' + dt.getMinutes() + '_' + dt.getMilliseconds() + '.png';
    fNameW = path.join(__dirname, 'pics/' + fName);
    console.log(fNameW)
    fs.writeFile(fNameW, pi, 'base64', (err) => {
        if (err)
            console.log('Unable to write ..');
        else
            console.log('Saved the image of author ')
    })
    var dbimgPath = 'http://localhost:4600/' + fName;
   var myDb=pgp(cs)
   myDb.none("insert into players values($1,$2,$3,$4,$5,$6,$7)",[i,nm,m,r,b,t,dbimgPath]).then((data)=>{
       res.send({"message":"inserted succesfully"})
   })
   pgp.end()
})
route.put('/:id',(req,res,next)=>{
    var i=req.params.id;
    var nm=req.body.pname
    console.log(nm)
    var m=req.body.matches
    var r=req.body.runs
    var b=req.body.best_score
    var t=req.body.team
    var pi=req.body.pimage
var myDb=pgp(cs)
   myDb.none("update players set pname=$1,matches=$2,runs=$3,best_score=$4,team=$5,pimage=$6 where pid=$7",[nm,m,r,b,t,pi,i]).then((data)=>{
       res.send({"message":"updated succesfully"})
   })
   pgp.end()
})
module.exports=route;