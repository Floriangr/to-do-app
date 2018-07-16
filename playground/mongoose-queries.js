const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {ToDo} = require('./../server/models/todos')

const id = '5b43bab8df4cbb284c3ac2df1'

if (!ObjectID.isValid(id)) {
  console.log('Object ID invalid')
}

ToDo.findOne({_id: id})
.then((todos) => {
  if (!todos) {
    return console.log('No todo found')
  }
  console.log(todos)
}).catch((e) => {
  console.log('Error occurred:', e)
})
