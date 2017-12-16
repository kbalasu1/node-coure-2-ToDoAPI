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

db.collection('Users').deleteMany({name: 'Karthik Balasubramanian'}).then((result) => {
    console.log(result);
});

db.collection('Users').findOneAndDelete({_id: new ObjectID('5a304b5831410055c4c78867')}).then((result) => {
    console.log(result);
});
});