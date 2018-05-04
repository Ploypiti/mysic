var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy  = require('passport-local').Strategy
const fileUpload = require('express-fileupload');

var server_port = process.env.PORT || 8080
var session_secret = "ThIsiSsECreT"
var connection_string = "mongodb://nisaruj:HDdpOxnplz1kRxTB@cluster0-shard-00-00-jujxx.mongodb.net:27017,cluster0-shard-00-01-jujxx.mongodb.net:27017,cluster0-shard-00-02-jujxx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
mongoose.connect(connection_string)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(require('express-session')({
    secret: session_secret,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

var Account = require('./models/account')
passport.use(new LocalStrategy(Account.authenticate()))
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

app.set('view engine','ejs')

var index_route = require('./routes/index')
var server = app.listen(server_port, function(){
    console.log('Listening on port %d',server_port)
})

app.use('/', index_route)

// Audio Uploader
app.use(fileUpload());

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let sampleFile = req.files.sampleFile;

  sampleFile.mv(__dirname + '/filename.mp3', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('Audio uploaded!');
  });
});

//Favicon
var favicon = require('serve-favicon')
app.use(favicon(__dirname + '/favicon.ico'));
