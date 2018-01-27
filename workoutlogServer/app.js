var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require('./middleware/headers'));

app.use('/api/test', function(req,res) {
    res.send('Hello World')
});

var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'Coff33=3n3rgy!', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('connected to workoutlog postgres db');
    },
    function(err) {
        console.log(err);
    }
)




app.listen(3000, function() {
    console.log("app is listening on 3000");
});

// build a user model in sqllize
var User = sequelize.define('user', {
    username: Sequelize.STRING,
    passwordhash: Sequelize.STRING,
})

// Creates the table in postgres
// Matched the model we defined
// Doesn't drop the db
User.sync();
// User.sync({force: true}); //drops the table completely (line 27ish)

app.use(bodyParser.json());

app.post('/api/user', function(req,res) {
    // when we post to api user, it wil want a user object in the body
    var username = req.body.user.username;
    var pass = req.body.user.password; //TODO: hash this password - HASH = not human readble

    // Match the model we create above
    // Sequelize - take the user model and go out to the db and create this:
    User.create({
        username: username,
        passwordhash: ""
    }).then (
        // Sequelize is going to return the object it created from db
        function createSuccess(user) {
            // Successful get this:
            res.json({
                user: user,
                message: 'create'
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});