/**
 *  2014/8/26.
 */
export default Ember.ArrayController.extend({
  actions: {
    createTodo : function () {
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      var todo = this.get('store').createRecord('todo', {
        title: title,
        isCompleted: false
      });

      this.set('newTitle', '');

      todo.save();
    },
    clearCompleted: function () {
      var completed = this.model.filterBy('isCompleted', true);
      completed.invoke('destroyRecord');
    }
  },
  remaining : function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('model.@each.isCompleted'),
  inflection : function() {
    var remaining = this.get('remaining');
    if(remaining === 0) return '';
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining'),
  completed: function () {
    return this.filterBy('isCompleted', true).get('length');
  }.property('model.@each.isCompleted'),
  hasCompleted: function () {
    return this.get('completed') > 0;
  }.property('completed'),
  allAreDone: function (key, value) {
    if(value === undefined){
      return !!this.get('length') && this.everyProperty('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('model.@each.isCompleted')
});