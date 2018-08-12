require("./config/config.js");

const express = require('express')
const bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')
const _ = require('lodash')

const {mongoose} = require('./db/mongoose')
const {ToDo} = require('./models/todos')
const {User} = require('./models/users')

var Prometheus = require('./../prometheus');

const app = express();

/**
 * The below arguments start the counter functions
 */
app.use(Prometheus.requestCounters);
app.use(Prometheus.responseCounters);

const requestCounter = new client.Counter({
  name: 'http_request_counter',
  help: 'Counts requests for all HTTP endpoints'
});
if (req.params.prop !== "metrics") {
      console.log("in if")
      requestCounter.inc();
    }
/**
 * Enable collection of default metrics
 */
Prometheus.startCollection();

/**
 * Enable metrics endpoint
 */
Prometheus.injectMetricsRoute(app);







// const Prometheus = require('prom-client');
//
// const collectDefaultMetrics = Prometheus.collectDefaultMetrics;
//
// const counter = new Prometheus.Counter({
//   name: 'NODEEEEEEEEEEEEEEEEEEEEEE',
//   help: 'metric_help'
// });
//
// counter.inc(); // Inc with 1
//
// collectDefaultMetrics({ prefix: 'node_test_' });
//

//
// app.get('/metrics', (req, res) => {
//   res.set('Content-Type', Prometheus.register.contentType)
//   res.end(Prometheus.register.metrics())
// });



app.use(bodyParser.json())


const port = process.env.PORT;


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
});

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
    return res.status(200).send({todo})
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

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }
    else {
      body.completed = false;
      body.completedAt = null;
    }

  ToDo.findByIdAndUpdate(id, {$set: body}, {new: true})
  .then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo)
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(port, () => {
  console.log('Server listening on port:', port)
})

module.exports = {app}
