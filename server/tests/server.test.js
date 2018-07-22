const expect = require('expect')
const request = require('supertest')
const {ObjectId} = require('mongodb')

const {app} = require('./../server')
const {ToDo} = require('./../models/todos')

const todos = [
  {
    _id: '5b43bab8df4cbb284c3ac2df',
    text: 'test'
  },
  {
  _id: new ObjectId(),
  text: 'test2'
  }
];

// beforeEach((done) => {
//   ToDo.remove({}).then(() => {
//     return ToDo.insertMany([{text: 'test'}, {text: 'test2'}])
//   }).then(() => done())
// })
//
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



describe ('Get /todos/:id', () => {
  it('should return todo on get request', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(todos[0].text);
    })
    .end(done)
  })

  it('should return 404 when Id invalid', () => {
    request(app)
    .get('/todos/123')
    .expect(404)
  })

  it('should return 404 when todo not found', () => {
    request(app)
    .get(`/todos/${new ObjectId().toHexString()}`)
    .expect(404)
  })
})









//   it('should not create to-do with invalid body data', (done) => {
//     request(app)
//     .post('/todos')
//     .send({})
//     .expect(400)
//   .end((err, res) => {
//     if (err) {
//       return (done)
//     }
//     ToDo.find().then((todos) => {
//       expect(todos.length).toBe(0)
//       done()
//     }).catch((e) => done(e))
//   })
// })
// })
