var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {user} = require('./models/user');
var {Todo} = require('./models/todo');


var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.post('/todos', (req,res) => {
    console.log(req.body);
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err) => {
        res.status(400).send(err);
    })
})
app.listen(port, () => {
    console.log(`started on port ${port}`);
});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send('not a valid ID');
    };

    Todo.findById(id).then((todo) => {
        if(!todo){
            res.status(404).send('unable to find ID', id)
        }
        res.send({todo});
    }).catch((e) => {
        res.send(400);
    });

})

module.exports = {app};