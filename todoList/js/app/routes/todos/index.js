/**
 *  2014/8/24.
 */
var TodosIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

export default TodosIndexRoute;