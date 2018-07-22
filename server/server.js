const express = require('express')
const bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')

const {mongoose} = require('./db/mongoose')
const {ToDo} = require('./models/todos')
const {User} = require('./models/users')

const app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 3000;

app.post('/todos', (req, res) => {
  const todo = new ToDo({text: req.body.text})

  todo.save().then((doc) => {
    res.send(doc),
  (e) => {
    res.status(400).send(e)
  }
  })
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  if (! ObjectId.isValid(id)) {
    return res.status(404).send("ID invalid")
  }
    ToDo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send("No todo found")
      }
      return res.status(200).send(todo)
    })
    .catch((e) => console.log("Error"))
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  if (! ObjectId.isValid(id)) {
    return res.status(404).send("Id invalid")
  }
  ToDo.findByIdAndRemove(id)
  .then((todo) => {
    if (! todo) {
      return res.status(404).send("Item didn't exist")
    }
    return res.status(200).send("Todo removed", todo)
  })
  .catch((e) => res.status(404).send())
});

app.get('/todos', (req, res) => {
  ToDo.find({}).then((todos) => {
    res.send({todos})
  }),
  (e) => {
    res.status(400).send(e)
  }
})

app.listen(port, () => {
  console.log('Server listening on port:', port)
})

module.exports = {app}
