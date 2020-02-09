var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});

mongoose.connect('mongodb+srv://username:password@todo-ekkhh.mongodb.net/test?retryWrites=true&w=majority');

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


module.exports = function(app){

    app.get('/todo', function(req, res){
        //retrieves all the items
        Todo.find({}, function(err, data){
            if (err) {
                throw err;
            }
            res.render('todo', {todos: data});
        });  
    });

    app.post('/todo', urlencodedParser, function(req, res){
        //get data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        //deleted the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });

};