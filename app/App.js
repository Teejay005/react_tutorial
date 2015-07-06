var React = require('react');
var Router = require('react-router');
var Routes = require('./config/routes');

Router.run(Routes, function(Root){
  React.render(< Root />, document.getElementById('app'))
});