var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

mongoose.connect(require('../config.js').dbUrl);

mongoose.set('debug', true);

// title : DS.attr('string'),
// isCompleted : DS.attr('boolean')
var TodoSchema = new Schema({
  title : String,
  isCompleted : Boolean
});

exports.Todo = mongoose.model('Todo', TodoSchema);