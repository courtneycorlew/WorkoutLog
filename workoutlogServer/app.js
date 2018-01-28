var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');

var User = sequelize.import(__dirname + '//models//user');

User.sync(); // User.sync({force: true});  <--WARNING: this will DROP the table!

app.use(bodyParser.json());
app.use('/api/user', require('./routes/user'));
//login route
app.use('/api/login', require('./routes/session'));
app.use(require('./middleware/headers'));

app.use('/api/test', function(req,res) {
    res.send('Hello World')
});

app.listen(3000, function() {
    console.log("app is listening on 3000");
});


