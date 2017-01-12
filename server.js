var mongoose       = require('mongoose');
var express        = require('express');
var morgan         = require('morgan');				// log requests to the console (express4)
var bodyParser     = require('body-parser');		// pull information from HTML POST (express4)
var methodOverride = require('method-override');	// simulate DELETE and PUT (express4)
var graphql        = require('graphql').graphql;
var graphQLHTTP    = require('express-graphql');

var Schema         = require('./schema');
var app            = express();

// This is just an internal test
var query = 'query { todos { id, title, completed } }'  ;
graphql(Schema, query).then( function(result) {
	console.log(JSON.stringify(result,null," "));
});

app.use(morgan('dev'));											// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));			// parse application/x-www-form-urlencoded
app.use(bodyParser.json());										// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));	// parse application/vnd.api+json as json
app.use(methodOverride());

app.use('/', graphQLHTTP({ schema: Schema, pretty: true }))
  .listen(8080, function (err) {
    console.log('GraphQL Server is now running on localhost:8080');
  });
