let express=require('express');
let app=express();
let bodyParser=require('body-parser');
let mongoose=require('mongoose');
let fs=require('fs');
let logger=require('morgan');
let path=require('path');
let index=require('./routes/index');
let insert=require('./routes/insert');
let update=require('./routes/update');
let remove=require('./routes/remove');
let http=require('http');

let port=3001;

let accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(logger('combined',{stream: accessLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',index);
app.use('/insert', insert);
app.use('/update', update);
app.use('/remove', remove);


let dbUrl='mongodb://localhost:27017/employee';
mongoose.connect(dbUrl);


http.createServer(app).listen(3003,'127.0.0.1');
console.log('Server running at http://127.0.0.1:3003/');

module.exports=app;