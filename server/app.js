//declare vars
var express = require('express');
var morgan = require('morgan');
var axios = require('axios');
var cache = {
    url: '',
    data: ''
};
var app = express();

//Use morgan to log as 'dev' logs
app.use(morgan('dev'));

//get req to OMDb
app.get('/', function (req, res) {
    //vars for req.query, i = id, t = title
    var iData = req.query.i;
    var tData = req.query.t;
    //console.log(iData, tData);
   

    if (iData) {//if iData present 
        if (cache.url === iData) { //return cache data if there
            res.send(cache.data);
        } else { //use axios for data req, cache and data res to user
            axios
                .get('http://www.omdbapi.com/?i=' + encodeURI(iData) + '&apikey=8730e0e')
                .then(response => {
                    cache.url = iData;
                    cache.data = response.data;
                    res.send(response.data);
                }).catch(err => res.json(error.message))
        }

    } else if (tData) { //if tData present
        if (cache.url === tData) { //return cache data if there
            res.send(cache.data);
        } else { //use for data req, cache and data res to user
            //var url = tData.replace(' ', '%20'); - could use in place of encodeURI
            axios
                .get('http://www.omdbapi.com/?t=' + encodeURI(tData) + '&apikey=8730e0e')
                .then(response => {
                    cache.url = tData;
                    cache.data = response.data;
                    res.send(response.data);
                }).catch(err => res.json(error.message))
        }
        
    }
    
});


// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter


module.exports = app;