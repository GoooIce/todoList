/**
 *  2014/9/4.
 */
var EditTodoView = Ember.TextField.extend({
  didInsertElement: function () {
    this.$().focus();
  }
});

export default EditTodoView;