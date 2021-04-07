
// These just contain endpoints that the front end can call to interact with Data

const express = require('express');
const router = express.Router();

// Bring in the UserTasks model to query the database
const UserTasks = require('../../models/UserTasks');

// @route GET api/useroptions
router.put('/', (req, res) => {
    UserTasks.findOne({date: new Date("2021-04-06T14:54:41.124+00:00")}, function(err, useroptions) {
        if (err) {
            console.log(err)
        }
        if (!useroptions) {
            res.json("Could not find User Data")
        }
        else {
            useroptions.email = req.body.email;
            useroptions.phonenumber = req.body.phonenumber;
            useroptions.sendphonenumber = req.body.sendphonenumber;
            useroptions.sendemail = req.body.sendemail;
            useroptions.timeperiod = req.body.timeperiod;
            useroptions.save(function (err) {
                if(err) {
                    console.log(err)
                }
                res.json(useroptions);
            })

        }})
})

module.exports = router;
