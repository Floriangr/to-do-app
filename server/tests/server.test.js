const expect = require('expect')
const request = require('supertest')
const {ObjectId} = require('mongodb')

const {app} = require('./../server')
const {ToDo} = require('./../models/todos')

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

beforeEach((done) => {
  ToDo.remove({})
  .then(() => {
    return ToDo.insertMany(todos);
  })
  .then(() => done());
});



// describe('Post /todos', () => {
//   it('should create a new to-do', (done) => {
//     const text = 'some to-do'
//
//     request(app)
//     .post('/todos')
//     .send({text})
//     .expect(200)
//     .expect((res) => {
//       expect(res.body.text).toBe('some to-do')
//     })
//     .end((err, res) => {
//       if (err) {
//         return done(err)
//       }
//       ToDo.find({text: 'some to-do'}).then((todos) => {
//         expect(todos.length).toBe(1)
//         expect(todos[0].text).toBe(text)
//         done()
//       }).catch((e) => done(e))
//     })
//   })
//
// describe('GET /todos', () => {
//   it('should get all todos', (done) => {
//     request(app)
//     .get('/todos')
//     .expect(200)
//     .expect((res) => {
//       expect(res.body.todos.length).toBe(2)
//     })
//     .end(done)
//   })
// })
//
//
//
// describe ('Get /todos/:id', () => {
//   it('should return todo on get request', (done) => {
//     request(app)
//     .get(`/todos/${todos[0]._id}`)
//     .expect(200)
//     .expect((res) => {
//       expect(res.body.text).toBe(todos[0].text);
//     })
//     .end(done)
//   })
//
//   it('should return 404 when Id invalid', () => {
//     request(app)
//     .get('/todos/123')
//     .expect(404)
//   })
//
//   it('should return 404 when todo not found', () => {
//     request(app)
//     .get(`/todos/${new ObjectId().toHexString()}`)
//     .expect(404)
//   })
// })
//
describe ('Delete /todos/:id', () => {
  it('should delete a todo by id', (done) => {
    const hexId = todos[0]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      request(app)
      .get(`/todos/${res.body.todo_id}`)
      .expect((res) => {
        expect(res.body.todo).toNotExist()
      })
      .end(done)
    })
  })
})

describe ('Patch /todos/:id', () => {
  it('should update a todo', (done) => {
    const hexId = todos[0]._id.toHexString();
    const text = 'abcdsdf';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({text, completed: true})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
      expect(res.body.completed).toBe(true);
      expect(res.body.completedAt).toBeA('number');
    })
    .end(done)
  })
  it('should clear completedAt when todo is not completed', (done) => {
    const hexId = todos[1]._id.toHexString();
    request(app)
    .patch(`/todos/${hexId}`)
    .send({completed: false})
    .expect(200)
    .expect((res) => {
      expect(res.body.completed).toBe(false);
      expect(res.body.completedAt).toNotExist();
    })
    .end(done)
  })
})
