const express = require('express');
const path = require('path');
const app = express();
const apiRouter = require('./routes/api/index');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//app.use("/static", express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "pug");

app.use('/api', apiRouter);
app.get('/', function(req, res, next){
  res.send({ hola : "mundo" });
});



//app.use(bodyParser.json());

const server = app.listen(8000, function(){
    console.log(`Listening http://localhost:${server.address().port}`);
});
