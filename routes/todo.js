var express = require('express');
var router = express.Router();

var Todo = require('../model/').Todo;

router.get('/todos', function (req, res) {
  Todo.find(function (err, todos) {
    if (err) return res.status(500).send(err.message);

    res.status(200).json({
      todos: todos,
      meta  : {
        'total': todos.length
      }
    });
  });
});

router.get('/todos/:id', function (req, res) {
  Todo.findById(req.params.id, function (err, Todo) {
    if (err) return res.status(500).send(err.message);

    res.status(200).json({
      Todo: Todo
    });
  });
});

router.put('/todos/:id', function (req, res) {
  Todo.findByIdAndUpdate(req.params.id, req.body.todo,function (err, todo) {
    if (err) return res.status(500).send(err.message);

    res.status(200).end();
  });
});

router.delete('/todos/:id', function (req, res) {
  Todo.findByIdAndRemove(req.params.id, function (err, todo) {
    if (err) return res.status(500).send(err.message);

    res.status(200).end();
  });
});

router.post('/todos', function (req, res) {
  var todo = new Todo({
    title:  req.body.todo.title,
    isCompleted: req.body.todo.isCompleted
  });
  todo.save(function(err) {
    if (err) return res.status(500).send(err.message);

    res.status(200).send({ todo: todo });
  })
});

module.exports = router;