export default Ember.Route.extend({
  model: function() {
    return ['a','b','c'];
  }
});

var EditTodoView = Ember.TextField.extend({
  didInsertElement: function () {
    this.$().focus();
  }
});
Ember.Handlebars.helper('edit-todo',editTodoView);
Ember.Logger.info('edit-todo helper');