const express = require('express');
const router = express.Router();

// Bring in the UserTasks model to query the database
const UserTasks = require('../../models/UserTasks');

// @route GET api/usertodos
router.get('/', (req, res) => {
    UserTasks.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

router.put('/', (req, res) => {
    UserTasks.findOne({date: new Date("2021-04-06T14:54:41.124+00:00")}, function(err, usertodos) {
        if (err) {
            console.log(err)
        }
        if (!usertodos) {
            res.json("Could not find User Data")
        }
        else {
            usertodos.userTodos = req.body.userTodos;
            usertodos.save(function (err) {
                if(err) {
                    console.log(err)
                }
                res.json(usertodos);
            })

        }})
})

module.exports = router;