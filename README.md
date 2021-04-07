# Calender App

This project was created using [Create React App](https://github.com/facebook/create-react-app), and is being distributed using Electron.

## App Installation

# For TAs

To install, simply clone the git, cd into the file and then run npm install ( This app requires Node to be on your PC! ) and then run npm run dev in a terminal.
You can also play around with editing the code (src contains all the functionality for the app). Just hit CTRL R and the app will reload whatever changes you've made.

npm run build can be run in the client folder to get an actualy build for the app, however the server must be running in order for the app to interact with its data, else it 
probably wont work. Best way to run this app would be to just clone the git, run npm install and then npm run dev at the root.

It'll run both the server and the client. The server will be ran locally on the machine (http://localhost:5000), however if this were a production app, it could just be
deployed to a hosting service instead, and then just the client could be distributed.
