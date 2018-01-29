var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var Definition = sequelize.import('../models/definition');
var description = req.body.definition.desc;
var logType = req.body.definition.type;
var owner = req.user.id;

router.post('/', function(req,res) {
    //variables

    //methods
    Definition
    //objects must match the model
    .create({
        description: description,
        logType: logType,
        owner: owner
    })
    .then (
        //createSuccess function
        function createSuccess(definition) {
            //send a response as json
            res.json({
                definition: definition
            });
        },

        //createError function
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.get('/', function(req, res) {
    //user variable
    var userid = req.user.id;
    Definition
    .findAll({
        where: {owner: userid}
    })
    .then(
        //success
        function findAllSuccess(data) {
            //console.log(data);
            res.json(data);
        },
        //failure
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

module.exports = router;