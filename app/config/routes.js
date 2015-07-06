var React = require('react');
var Main = require('../components/Main.js');
var Home = require('../components/Home.js');
var Profile = require('../components/Profile.js');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name='app' path='/' handler={Main}>
    <Route name='profile' path='profile/:username' handler={Profile}/>
    <DefaultRoute handler={Home}/>
  </Route>
);