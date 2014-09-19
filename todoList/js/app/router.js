var Router = Ember.Router.extend();

Router.map(function() {
  this.resource("about");
  this.resource('todos', {path: '/'}, function () {
    this.route('active');
    this.route('completed');
  });
});

export default Router;
