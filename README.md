# Calender App

This project was created using [Create React App](https://github.com/facebook/create-react-app), and is being distributed using Electron. It was made for 5010 for Comp Eng.


![Calendar](https://user-images.githubusercontent.com/69441236/127722714-36fd9f15-cc28-4ac7-8a95-e0b1a0909f8b.PNG)


## App Installation

# For TAs

To install, simply clone the git, cd into the file and then run the following commands:

`npm i` in the root folder  
`npm i` in the client folder  
`npm run dev` in the root folder  

You can also play around with editing the code (src contains all the functionality for the app). Just hit CTRL R and the app will reload whatever changes you've made.

`npm run build` can be run in the client folder to get an actualy build for the app, however since the app needs to communicate with the backend, it probably wont work unless the express server is being ran locally.

`npm run dev` runs both the server and the client. The server will be ran locally on the machine (http://localhost:5000) as well as the client (http://localhost:3000), however if this were a production app, it could just be deployed to a hosting service instead, and then just the client could be distributed.

# Notifications

The app has notifications for both SMS and email. We have the hourly option for sending notifications set to 3 minutes instead just for testing purposes / for the presentation. 

The format for text messaging is just "+**********".

So for example, a typical Newfoundland phone number in the text field should be "+17091112222"
