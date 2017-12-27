const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text:'First test Todo'
},{
    _id: new ObjectID(),
    text:'Second test Todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done())
});

describe('POST /Todos', () => {
    it('should create a new Todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err,res) => {
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((Todos) => {
                    expect(Todos.length).toBe(1);
                    expect(Todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    })
    it('should not create a todo with invalid data', (done) => {
        var text = ""
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if(err){
                    return done(err);
                }
                Todo.find().then((Todos) => {
                    expect(Todos.length).toBe(2)
                    done();
                }).catch((e) => done(e))
            })
    });
})

describe('GET /todos',() => {
    it('should get all Todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should get a specific Todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        var id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/:${id}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 if an invalid ObjectID is used', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    })
});