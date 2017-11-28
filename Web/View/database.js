
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
/* the database name is stored in a private variable instead of being 'hard-coded' so it can be replaced using the 'rewire' module. This avoids the need for the unit tests to run against the 'live' database. */
var database = 'api'
/* the server connections string includes both the database server IP address and the name of the database. */
const server = 'mongodb://'+process.env.IP+':27017/'+database
console.log(server)
/* the mongoose drivers connect to the server and return a connection object. */
mongoose.connect(server)
const db = mongoose.connection
/* END OF MONGOOSE SETUP */





/* all documents in a 'collection' must adhere to a defined 'schema'.
Here we define a new schema that includes a mandatory string and an array of strings. */
const QuerySchema = new mongoose.Schema({
    query: { type: String, required: true },
    count: {type: Number, required: true },
    results: [ {type: String} ]
})
const MovieSchema = new mongoose.Schema({
    Mtitle: { type: String, required: true },
    overview: { type: String, required: true },
    genre: { type: String, required: true },
    production: { type: String, required: true },
    original_language: { type: String, required: true },
    release_date: { type: String, required: true },
    revenue: {type: Number, required: true },
    rating: {type: Number},
})
/* the schema is associated with the 'Query' collection which means it will be
applied to all documents added to the collection. */
const Query = mongoose.model('Query', QuerySchema)
/* END OF DEFINING SCHEMA */




/* notice we are using the 'arrow function' syntax. In this example there are
more than one parameter so they need to be enclosed in brackets. */
exports.addQuery = (mData, callback) => {
  console.log('addQuery()...');
  /* now we have extracted the data we can use it to create a new 'Query' object that adopts the correct schema. */
  const newQuery = new Query({ query: mData.query, count: mData.data.length, results:JSON.stringify(mData.data)  });
  newQuery.save( (err, data) => {
    if (err)
      callback('error: '+err);
    else
      callback('Query results saved');
  })
}

exports.getAll = callback => {
  /* the Query object contains several useful properties. The 'find' property contains a function to search the MongoDB document collection. */
  Query.find( (err, data) => {
    if (err) {
      callback('error: '+err)
    }
    const query = data.map( item => {
      return {id: item._id, name: item.name}
    })
    callback(query)
  })
}


exports.getByQuery = (findkeys, callback) => {
  /* the 'find' property function can take a second 'filter' parameter. */
  Query.findOne({'query': findkeys}, (err, data) => {
    if (err)
      callback('error: ' + err)
      /*3 types of No data error from mongoDb
      err = null, results = []
      err = null, results = null
      err = error document, results = null
      */
    else if(data==[] || data==null)
      callback(null)
    else
      callback(data._doc);	//_doc is the actual data saved
  })
}
exports.getById = (id, callback) => {
  /* the 'find' property function can take a second 'filter' parameter. */
  Query.find({_id: id}, (err, data) => {
    if (err) {
      callback('error: '+err)
    }
    callback(data)
  })
}

exports.clear = (callback) => {
  /* the 'remove()' function removes any document matching the supplied criteria. */
  Query.remove({}, err => {
    if (err) {
      callback('error: '+err)
    }
    callback('Queries deleted')
  })
}