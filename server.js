const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

// SMS imformation. This wouldn't be stored in code in a normal application for security reasons
const accountSid = "ACf244620a02ca8d3af85bfcd534e2a39a";
const authToken = "794d3b13ef52cd462262d718ab6f128a";
const client = require('twilio')(accountSid, authToken);

const UserTasks = require('./models/UserTasks');
const usertasks = require('./routes/api/usertasks');
const usertodos = require('./routes/api/usertodos');

// Phone Number for SMS: +(201) 862-7384

const app = express();

// This is unsecure, and in an actuall production app, would probably have it stored in an env variable
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lethecalendar@gmail.com',
      pass: 'TheBabadook123###4567' // naturally, replace both with your real credentials or an application-specific password
    }
});

// Every minute we send out an email to the user with a list of all their upcoming tasks on their calendar.
cron.schedule('*/1 * * * *', () => {

    // TODO
    // Add a way to actually check to see if the user has notifcations enabled,
    // because right now it sends the emails out regardless of front end state.
    UserTasks.findOne({date: new Date("2021-04-06T14:54:41.124+00:00")}, function(err, usertasks) {
        if (err) {
            console.log(err)
        }
        if (!usertasks) {
            res.json("Could not find User Data")
        }
        else {
            var tasks = usertasks.userTasks;
            var message = "\n\n\nHello from Lethe!\n\nHere are your upcoming tasks:\n\n";    

            if (tasks.length === 0) {
                message += "You have no upcoming events!"
            }
            else {
                for (let i = 0; i < tasks.length; i++) {
                    if (new Date(tasks[i][0]) >= new Date()) {
                        message += `Event: ${tasks[i][1]} \nDate: ${(new Date(tasks[i][0])).getFullYear()}-${(new Date(tasks[i][0])).getMonth()}-${(new Date(tasks[i][0])).getDate()}\n\n`
                    }
                }
            }
        
            //  Mail info
            const mailOptions = {
                from: 'lethecalendar@gmail.com',
                to: 'boojarrod@gmail.com',
                subject: 'Daily Notification',
                text: message
            };
        
            // Send mail here
            transporter.sendMail(mailOptions, function (err, info) {
                if(err) 
                    console.log(err);
                else
                    console.log(info);
            });

            // Send SMS message here
            client.messages.create({
                to: '+17094248379',
                from: '+12018627384',
                body: message
            });
        }})    
});

// Body Parser
app.use(bodyParser.json());

// Databse Config
const db = require('./config/keys').mongoURI;

// We connect to the database here.
mongoose
    .connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err));


// Attach endpoints here for the server
app.use('/api/usertasks', usertasks)
app.use('/api/usertodos', usertodos)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
