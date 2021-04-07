const express = require('express');
const router = express.Router();

// Bring in the UserTasks model to query the database
const UserTasks = require('../../models/UserTasks');

// @route GET api/usertasks
router.get('/', (req, res) => {
    UserTasks.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

router.put('/', (req, res) => {
    UserTasks.findOne({date: new Date("2021-04-06T14:54:41.124+00:00")}, function(err, usertasks) {
        if (err) {
            console.log(err)
        }
        if (!usertasks) {
            res.json("Could not find User Data")
        }
        else {
            usertasks.userTasks = req.body.userTasks;
            usertasks.save(function (err) {
                if(err) {
                    console.log(err)
                }
                res.json(usertasks);
            })

        }})
})



// @route POST api/usertasks
router.post('/', (req, res) => {
    
    const newTask = new UserTasks({
        userTasks: req.body.userTasks,
        name: "name_example"
    });

    newTask.save().then(item => res.json(item));
});


module.exports = router;
