const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

//   db.collection('Todos').insertOne({
//     text: 'to to',
//     completed: 'false'
//   }, (err, result) => {
//     if(err) {
//       return console.log('Unable to insert document', err)
//     }
//     return console.log('Inserted document', JSON.stringify(result.ops, undefined, 2))
//   })
//   db.close()
// })

db.collection('Users').insertOne({
  Name: 'Florian',
  Age: 29,
  Location: 'Dusseldorf'
}, (err, result) => {
  if(err) {
    return console.log('Unable to insert document', err)
  }
  return console.log('Inserted document', JSON.stringify(result.ops, undefined, 2))
})
db.close()
})
