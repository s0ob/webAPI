var request = require('request')
exports.searchMovies = function(query, callback) { //callback is an output parameter, kind of a return parameter (see #)
  console.log('Movie titles.search(' + query + '....)')
  if (typeof query !== 'string' || query.length === 0) {
  	console.log('No word for query')
    callback({code:400, response:{status:'error', message:'No word for query'}})	//# create an object and return it via callback
  }
  const APIKEY ='ca79a6ea91d221034bf6c18bfcb5944c'
// const url = 'https://api.themoviedb.org/3/search/company?api_key='+APIKEY+'&query='+query+'&page=1'
// const url = 'https://api.themoviedb.org/3/movie/2346?api_key='+APIKEY+'&language=en-US'

 const url = 'https://api.themoviedb.org/3/search/movie?api_key='+APIKEY+'&language=en-US&query='+query+'&page=1&include_adult=false'


  request.get({url: url}, function(err, res, body) {	//function executed on receiving respond from Web API
    if (err) {
    	console.log('Movie Search failed')
      callback({code:500, response:{status:'error', message:'Search failed', data:err}})
    }

    const json = JSON.parse(body)	//convert body to object
    const items = json.results
    if (items){
	    const movies = items.map(function(element) {
	     /* 
	     return {num:element.id, Title:element.name, poster_path:element.logo_path
	     
	       }
	      */
       return {
      num:element.id, Title:element.title, image:element.poster_path, 
      summary:element.overview, date:element.release_date, rating:element.vote_average
      
       }
      
	    })
	    console.log(movies.length +' Movies found')
	    callback({code:200, response:{status:'success', message:movies.length+' movies found', data:movies}})
    }
    else
    	callback({code:200, response:{status:'success', message:'No movies found', data:''}})
  })
}


