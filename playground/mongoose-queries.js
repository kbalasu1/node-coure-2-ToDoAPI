const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// var id = '5a4015ab14a3242048280840';

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('ID not found');
//     }
//     console.log(todo);
// }).catch((e) => {
//     console.log(e);
// });

//var id = '5a304b7de1daa955cbaa994c';
var id = '5a397bcd39d6829d6beaab9f';
User.findById(id).then((user) => {
    if(!user){
        return console.log('User ID not found');
    }
    console.log(user);
}).catch((e) => {
    console.log(e);
})