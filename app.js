var express = require('express');

var app = express();
var app2 = express();

var port = process.env.PORT || 5000;
var port2 = process.env.PORT || 5051;

// app.use(express.static('public'));

app.use(express.static('public',{extensions:['html']}));
app2.use(express.static('dist',{extensions:['html']}));

app.get('/', function (req, res) {
  res.render('index', {
  });
});

app2.get('/', function (req, res) {
  res.render('index', {
  });
});

app.listen(port, function (err) {
  console.log('running server on port ' + port);
});

app2.listen(port2, function (err) {
  console.log('running server on port ' + port2);
});
