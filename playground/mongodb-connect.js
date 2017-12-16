const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
if(err){
    return console.log('unable to connect to DB Server');
}
console.log('connected to Mongo DB server');
var name = 'Karthik Balasubramanian';
db.collection('Users').find({name: name}).count().then((count) => {
    console.log(`number of users with the name ${name} is ${count}` );
})
// db.collection('ToDos').find().count().then((count) => {
//     console.log('total number of objects', count);
// }, (err) => {
//     console.log('error getting Todos Count', err)
// });
// db.collection('ToDos').find({completed: false}).toArray().then( (docs) => {
//     console.log('todos');
//     console.log(JSON.stringify(docs, undefined, 2));

// }, (err) => {
//     console.log('unable to fetch the data', err);
// })
// db.collection('ToDos').insertOne({
//     text:'Something to do',
//     completed: false
// }, (err, result) => {
//     if(err)
//     {
//         return console.log('unable to insert to ToDos');
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
// });

// db.collection('Users').insertOne({
//     name: 'Karthik Balasubramanian',
//     age: '32',
//     location: 'Chicago'
// }, (err,result) => {
//     if(err){
//         return console.log('unable to insert to Users');
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
// })
// db.close();
 });