
var express=require('express');
var fs=require('fs')
var path=require('path')
var plyrRoutes=require('./players');
var regRoutes=require('./register')
var promise=require('bluebird')
var ms=require('./schedule')
 var app=express()
 
 app.all('*', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", '*');

    res.header("Access-Control-Allow-Headers", "Cache-Control,Pragma, Origin, Authorization, Content-Type, X-Requested-With");

    res.header("Access-Control-Allow-Methods", "*");

    return next();
});
 app.set('port',process.env.PORT||4600)

 app.use(express.static(path.resolve(__dirname, 'pics')))

 app.use('/players',plyrRoutes);
 app.use('/register',regRoutes);
 app.use('/schedule',ms);

 app.listen(app.get('port'),(err)=>{
    if(err){
        console.log("server error..")
    }
    else{
        console.log("server is started...  http://localhost:"+app.get('port'))
    }
})