/* (0) ####load required modules#### */
var restify = require('restify')
var movie = require('./movie.js')

/* (1) ####CONFIGURE THE REST SERVER#### */
/* (1-1) import the required plugins to parse the body and auth header. */
var server = restify.createServer()
server.use(restify.queryParser())		//parse querystring params to req.query
server.use(restify.fullResponse())	//handles disappeared CORS headers
server.use(restify.bodyParser())		//parse POST bodies to req.body
server.use(restify.authorizationParser()) //parse Authroization header to req.authorization

/* (1-2) setup port & default error handler */
var port = 8080;
server.listen(port, function (err) {
  if (err) {
      console.error(err);
  } else {
    console.log('App is ready at : ' + port);
  }
})

/* (2) ####DEFINE YOUR REST SERVICES#### */
server.get('/test', function(req, res){ res.send({'status':200, 'message':'Successful'});})

//server.get('/movies/etc', function (req,res)(.......define the function so that it could display the movies))
server.get('/movies/:year', function(req,res){processMovie(req,res)})
server.get('/movies/:title/:year', function(req,res){processMovie(req,res)})
var processMovie = function(req,res){
	stars = ''
	for(var i=0; i< parseInt(req.params.year); i++) {
		stars = stars + '*'
	}
	res.send({'status':'200', 'message':'Got it!', 'yourTitle':req.params.title, 'yourYear':stars})
}


server.get('/search', function(req, res) {
	const searchTerm = req.query.q;
  console.log('GET /search?q=' + searchTerm)
  if (typeof searchTerm == 'undefined') {
  	res.send({'status':404, 'message':'no keyword for search'})
  	return
  }


movie.searchMovies(searchTerm, function(data) {
    console.log('From MovieDB API ...' + JSON.stringify(data))
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    //res.setHeader("Access-Control-Allow-Origin", "*")	//https://cde305-permacultureprogrammer.c9users.io:8081
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
    res.setHeader('Content-Type', 'application/json');
    res.send(data.code, data.response);
    console.log(JSON.stringify(data.response))
    res.end();
  })
})



//server.get('/movies', function(req, res, next){ var json = {'status':200}; res.send(json);})