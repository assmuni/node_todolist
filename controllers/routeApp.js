var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// # koneksi database
mongoose.connect('mongodb://userTodo:todo123@ds157509.mlab.com:57509/portofolio', { useNewUrlParser: true });

// # schema document / blue print
var todoSchema = new mongoose.Schema({
    todo: String,
    type: String
});

// # model
// # param_1 nama document/tabel
// # param_2 nama schema yg di pakek
var Todo = mongoose.model('todolists', todoSchema);

// # insert data input data sesuai bentuk schema
// var todoOne = Todo({
//     todo: 'Task 4',
//     type: 'warning'
// }).save(function(err){
//     if (err) throw err;
//     console.log('Item saved');
// });

// # body parser
var urlencodePaser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
    
    app.get('/', (req, res) => {
        res.redirect('/todo');
    });

    app.get('/todo', (req, res) => {
        // get data from mongoos and parse to view
        // Todo.find({ todo: 'Task 1' });  // # select per item / search
        
        // Todo.find({}, function(err, data) {
        //     if (err) throw err;
        //     res.render('todo', {data: data});
        // });

        // Todo.find({todo: /.*m.*/}).sort({_id: 'asc'}).exec(function(err, data) {
        Todo.find({}).sort({_id: 'asc'}).exec(function(err, data) {
        
            if (err) throw err;
            res.render('todo', {data: data});
        });

    });

    app.post('/todo', urlencodePaser, (req, res) => {
        // get data from view and added to mongo db
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:_id', (req, res) => {
        // delete the requested item from mongo db
        Todo.find({ _id: req.params._id }).deleteOne(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

}