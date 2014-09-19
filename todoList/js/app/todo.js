import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

var App = Ember.Application.extend({
  modulePrefix: 'todoList',
  Resolver: Resolver['default']
});

// 预加载用到初始化，暂时无视之。
//loadInitializers(App, 'todoList');

export default App;
