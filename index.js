//https://thecodingtrain.com/tracks/data-and-apis-in-javascript/data/2-data-selfie-app/3-http-post-request
//2.4 complete

const express = require('express');
// call the express library when you create the app variable 
const app = express()
//create nedb database
const Datastore = require('nedb');
// sets the app to listen at port 3000, adds a callback to print to the command line once that is happening
app.listen(3000, () => console.log('listening at 3000'));
//point the express server to the public directory
app.use(express.static('public'));
//this is the json parser
app.use(express.json({ limit: '1mb' }));

//holder for data 
const database = new Datastore('database.db');
//loads the database
database.loadDatabase();


//set up the target for posting the information
//the function follows '=>'. (request, response) are the two arguments
app.post('/add_ferry', (request, response) => {
    console.log('I added a ferry!');
    //we only care about the body of the payload
    console.log(request.body);
    const data = request.body;

    //for timestamp
    const timestamp = Date.now();
    data.timestamp = timestamp;

    //add the data to the database
    database.insert(data);
    //send a response with the data
    response.json(data);
});

//set up the target for getting the information
app.get('/api', (request, response) => {
    //find all of the data in the database
    database.find({}, (err, data) => {
        //light error handling
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
    
});

app.post('/vote', (request, response) => {
    console.log('I got a vote request!');
    const data = request.body;
    console.log(data);
    //updates the DB
    database.update(
        //identifies the ferry you want to update
        {'ferry': data.winningFerry}, 
        //this is the value you want to update
        { $set: {'votes': data.winningVotes}},
        //I think this is used for when you want to batch update (false in this case)
        {multi: false },
        //this is just the function language it is looking for
        function (err, numReplaced) {

        });
    database.update(
        //identifies the ferry you want to update
        {'ferry': data.winningFerry}, 
        //this is the value you want to update
        { $set: {'shows': data.winningShows}},
        //I think this is used for when you want to batch update (false in this case)
        {multi: false },
        //this is just the function language it is looking for
        function (err, numReplaced) {

        });
    database.update(
        //identifies the ferry you want to update
        {'ferry': data.winningFerry}, 
        //this is the value you want to update
        { $set: {'winRate': data.winningWinRate}},
        //I think this is used for when you want to batch update (false in this case)
        {multi: false },
        //this is just the function language it is looking for
        function (err, numReplaced) {

        });
            
    database.update(
        //identifies the ferry you want to update
        {'ferry': data.losingFerry}, 
        //this is the value you want to update
        { $set: {'votes': data.losingVotes}},
        //I think this is used for when you want to batch update (false in this case)
        {multi: false },
        //this is just the function language it is looking for
        function (err, numReplaced) {

        });

    database.update(
        //identifies the ferry you want to update
        {'ferry': data.losingFerry}, 
        //this is the value you want to update
        { $set: {'shows': data.losingShows}},
        //I think this is used for when you want to batch update (false in this case)
        {multi: false },
        //this is just the function language it is looking for
        function (err, numReplaced) {

        });

    database.update(
        //identifies the ferry you want to update
        {'ferry': data.losingFerry}, 
        //this is the value you want to update
        { $set: {'winRate': data.losingWinRate}},
        //I think this is used for when you want to batch update (false in this case)
        {multi: false },
        //this is just the function language it is looking for
        function (err, numReplaced) {

        });

    
    response.json(data);
})

