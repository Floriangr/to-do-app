const { ObjectId } = require('mongodb');
const { ToDo } = require('./../models/todos');
const { User } = require('./../models/users');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [{
  _id: userOneId,
  email: 'florian@email.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
},
{
  _id: userTwoId,
  email: 'peter@email.com',
  password: 'userTwoPass'
}];

const todos = [
  {
    _id: new ObjectId(),
    text: 'test'
  },
  {
  _id: new ObjectId(),
  text: 'test2',
  completed: true,
  completedAt: 333
  }
];

const populateToDos = (done) => {
  ToDo.remove({})
  .then(() => {
    return ToDo.insertMany(todos);
  })
  .then(() => done());
};

const populateUsers = (done) => {
  User.remove({})
  .then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  })
  .then(() => done());
};

module.exports = {
  todos,
  populateToDos,
  users,
  populateUsers
};
