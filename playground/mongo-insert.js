const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
if(err){
    return console.log('unable to connect to DB Server');
}
console.log('connected to Mongo DB server');

db.collection('ToDos').insertOne({
    text:'walk the dog',
    completed: false
}, (err, result) => {
    if(err)
    {
        return console.log('unable to insert to ToDos');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
});
db.close();
});