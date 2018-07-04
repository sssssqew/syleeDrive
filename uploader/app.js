const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const api = require('./routes');
const app = express();

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongo db server'); });
mongoose.connect('mongodb://localhost/codelab');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/* Use cors and fileUpload*/
app.use(cors());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

app.use('/api', api);

app.get('/', (req, res) => {
	res.send('hi');
})

// app.post('/upload', (req, res, next) => {
//   let imageFile = req.files.file;

//   imageFile.mv(`${__dirname}/public/${req.body.filename}`, function(err) {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     res.json({file: `public/${req.body.filename}`});
//   });
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
