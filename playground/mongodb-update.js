const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
if(err){
    return console.log('unable to connect to DB Server');
}
//delete many
// db.collection('ToDos').deleteMany({text: 'Eat Lunch'}).then((result) => {
//     console.log('result ',result);
// })

// db.collection('ToDos').findOneAndDelete({completed: false}). then((result) => {
//     console.log(result);
// })
// db.collection('ToDos').findOneAndUpdate({
//     _id: new ObjectID('5a354b6914d4d13f150833ac')
// }, {
//     $set: {
//         completed: true
//     }
// }, {
//     returnOriginal: false
// }).then((result) => {
//     console.log(result)
// });

db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a304b7de1daa955cbaa994c')
}, {
    $set: {
        name: 'Uma Balasubramanian'
    },
    $inc:{
        age: 1
    }
}, {
    returnOriginal: false
}).then((result) => {
    console.log(result)
});
});