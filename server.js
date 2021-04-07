const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const UserTasks = require('./models/UserTasks');

const usertasks = require('./routes/api/usertasks');
const usertodos = require('./routes/api/usertodos');

const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lethecalendar@gmail.com',
      pass: 'TheBabadook123###4567' // naturally, replace both with your real credentials or an application-specific password
    }
});
  
cron.schedule('0 */1 * * * *', () => {
    UserTasks.findOne({date: new Date("2021-04-06T14:54:41.124+00:00")}, function(err, usertasks) {
        if (err) {
            console.log(err)
        }
        if (!usertasks) {
            res.json("Could not find User Data")
        }
        else {
            var tasks = usertasks.userTasks;
            var message = "Hello from Lethe!\n\nHere are your upcoming tasks:\n\n";    

            if (tasks.length === 0) {
                message += "You have no upcoming events!"
            }
            else {
                for (let i = 0; i < tasks.length; i++) {
                    message += `| ${tasks[i][1]} : \n|${(new Date(tasks[i][0])).getFullYear()}-${(new Date(tasks[i][0])).getMonth()}-${(new Date(tasks[i][0])).getDate()}\n\n`
                }
            }
        
            const mailOptions = {
                from: 'lethecalendar@gmail.com',
                to: 'boojarrod@gmail.com',
                subject: 'Daily Notification',
                text: message
            };
        
            transporter.sendMail(mailOptions, function (err, info) {
                if(err) 
                    console.log(err);
                else
                    console.log(info);
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

app.use('/api/usertasks', usertasks)
app.use('/api/usertodos', usertodos)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
