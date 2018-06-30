const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

// db.collection('Todos').deleteMany({text: 'Call friend'}).then((result) => {
//   console.log(result)
// })

db.collection('Users').findOneAndDelete({_id: new ObjectID("5b379a8397e6a461b33926bc")}).then((result) => {
  console.log(result)
})

// db.close()
})

// C:\Program Files\MongoDB\Server\3.6\bin>mongod --dbpath C:\Users\flo_9\mongo-data
