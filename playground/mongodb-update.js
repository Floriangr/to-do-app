const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

// db.collection('Todos').findOneAndUpdate({Text: 'Watch football'}, {$set: {Completed: true}}, {returnOriginal: false})
// .then((result) => {
//   console.log('Result', result)
// })

db.collection('Users').findOneAndUpdate({_id: new ObjectID('5b379a8997e6a461b33926be')}, {$set: {Name: 'Paul'}, $inc: {Age: 10}}, {returnOriginal: false})
.then((result) => {
  console.log('Result', result)
})


})

// C:\Program Files\MongoDB\Server\3.6\bin>mongod --dbpath C:\Users\flo_9\mongo-data
