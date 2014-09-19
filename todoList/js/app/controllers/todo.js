/**
 *  2014/9/3.
 */
export default Ember.ObjectController.extend({
  // Because the controller's properties are not the same as the {{each}} helper's properties.
  // {{each}} internally creates an instance of Ember.Handlebars.
  // EachView to display each item in the Todos.TodosController's content property.
  // It is this view that needs the itemController property so that it can create a new Todos.
  // TodoController (note the singular form) instance for each child view.
  isEditing: false,
  isCompleted: function(key, value){
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted'),
  actions: {
    editTodo: function () {
      this.set('isEditing', true);
      console.log('isEditing');
    },
    acceptChanges: function() {
      var model = this.get('model');
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
        // Todo: 这个bug不知道是为啥出现的不影响使用存储那也会出现错误，但是model.get('errors')捕获不到错误。。。
        // Uncaught Error: Attempted to handle event `deleteRecord` on <(subclass of DS.Model):ember469> while in state root.deleted.inFlight.
      } else {
        model.save().then(function (todo) {
          //
        }, function () {
          console.log('todo save errors num::' + model.get('errors.length') +  '::' + model.get('errors'));
        });
      }
    },
    removeTodo: function () {
      var model = this.get('model');
      model.destroyRecord().then(function () {
        //
      }, function () {
        console.log('todo del errors num::' + model.get('errors.length') +  '::' + model.get('errors'));
      });
    }
  }
});