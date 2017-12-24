const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text:'First test Todo'
},{
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
})