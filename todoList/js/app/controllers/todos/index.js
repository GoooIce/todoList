/**
 *  2014/9/7.
 */
var TodosIndexController = Ember.ArrayController.extend({
  // Because the controller's properties are not the same as the {{each}} helper's properties.
  // {{each}} internally creates an instance of Ember.Handlebars.
  // EachView to display each item in the Todos.TodosController's content property.
  // It is this view that needs the itemController property so that it can create a new Todos.
  // TodoController (note the singular form) instance for each child view.
  itemController: 'todo'
});

export default TodosIndexController;