const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

// db.collection('Todos').find({completed: 'false'}).toArray().then((docs) => {
//   console.log('Todos')
//   console.log(JSON.stringify(docs, undefined, 2))
//   if (err) {
//     console.log('Unable to fetch docs from MongoDB', err)
//   }
// })

db.collection('Todos').find().count().then((count) => {
  console.log(`Count ${count}`),
  (err) => {
    console.log('Unable to fetch docs from MongoDB', err)
  }
})

db.close()
})

// C:\Program Files\MongoDB\Server\3.6\bin>mongod --dbpath C:\Users\flo_9\mongo-data
