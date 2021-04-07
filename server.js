const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

// SMS imformation. This wouldn't be stored in code in a normal application for security reasons
const accountSid = "ACf244620a02ca8d3af85bfcd534e2a39a";
const authToken = "58339eb8fb02b0b3c06a67acc4fd5afa";
const client = require('twilio')(accountSid, authToken);

const UserTasks = require('./models/UserTasks');
const usertasks = require('./routes/api/usertasks');
const usertodos = require('./routes/api/usertodos');
const useroptions = require('./routes/api/useroptions');

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

// The below code used the cron schedule NPM package which schedules our express
// app to send out scheduled notifications depending on what each user has for their settings
// ie hourly, weekly, monthly.

// Sends hourly / Every minute for presentation purposes
cron.schedule('*/3 * * * *', () => {
    UserTasks.findOne({date: new Date("2021-04-06T14:54:41.124+00:00")}, function(err, usertasks) {
        if (err) {
            console.log(err)
        }
        if (!usertasks) {
            res.json("Could not find User Data")
        }
        else {
            if (usertasks.timeperiod === "hourly") {
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
                    to: usertasks.email,
                    subject: 'Daily Notification',
                    text: message
                };
            
                // Send mail here
                if (usertasks.sendemail && usertasks.email) {
                    transporter.sendMail(mailOptions, function (err, info) {
                        if(err) 
                            console.log(err);
                        else
                            console.log(info);
                    });
                }
    
                // Send SMS message here
                if (usertasks.sendphonenumber && usertasks.phonenumber) {
                    client.messages.create({
                        to: usertasks.phonenumber,
                        from: '+12018627384',
                        body: message
                    });
                }}
            }
        })    
});

// Sends notications weekly
cron.schedule('* * * * 7', () => {
    UserTasks.findOne({date: new Date("2021-04-06T14:54:41.124+00:00")}, function(err, usertasks) {
        if (err) {
            console.log(err)
        }
        if (!usertasks) {
            res.json("Could not find User Data")
        }
        else {
            if (usertasks.timeperiod === "weekly") {
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
                    to: usertasks.email,
                    subject: 'Daily Notification',
                    text: message
                };
            
                // Send mail here
                if (usertasks.sendemail && usertasks.email) {
                    transporter.sendMail(mailOptions, function (err, info) {
                        if(err) 
                            console.log(err);
                        else
                            console.log(info);
                    });
                }
    
                // Send SMS message here
                if (usertasks.sendphonenumber && usertasks.phonenumber) {
                    client.messages.create({
                        to: usertasks.phonenumber,
                        from: '+12018627384',
                        body: message
                    });
                }}
            }
        })    
});

// Sends notications weekly
cron.schedule('* * * 1-12/1 *', () => {
    UserTasks.findOne({date: new Date("2021-04-06T14:54:41.124+00:00")}, function(err, usertasks) {
        if (err) {
            console.log(err)
        }
        if (!usertasks) {
            res.json("Could not find User Data")
        }
        else {
            if (usertasks.timeperiod === "monthly") {
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
                    to: usertasks.email,
                    subject: 'Daily Notification',
                    text: message
                };
            
                // Send mail here
                if (usertasks.sendemail && usertasks.email) {
                    transporter.sendMail(mailOptions, function (err, info) {
                        if(err) 
                            console.log(err);
                        else
                            console.log(info);
                    });
                }
    
                // Send SMS message here
                if (usertasks.sendphonenumber && usertasks.phonenumber) {
                    client.messages.create({
                        to: usertasks.phonenumber,
                        from: '+12018627384',
                        body: message
                    });
                }}
            }
        })    
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
app.use('/api/useroptions', useroptions)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
