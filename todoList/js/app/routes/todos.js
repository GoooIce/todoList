/**
 *  2014/9/7.
 */
var TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

export default TodosRoute;