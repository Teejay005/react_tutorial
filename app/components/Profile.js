var React = require('react');
var Router = require('react-router');
var UserProile = require('./Github/UserProfile');
var Repos = require('./Github/Repos');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase  =require('firebase');
var helpers = require('../utils/helpers');

var Profile = React.createClass({
  mixins: [Router.State, ReactFireMixin],
  getInitialState: function(){
    return {
      notes: [],
      bio: {},
      repos: []
    }
  },
  init: function(){
    var ChildRef = this.ref.child(this.getParams().username);
    this.bindAsArray(ChildRef, 'notes');

    helpers.getGithubInfo(this.getParams().username)
      .then(function(dataObj){
          this.setState({
            bio: dataObj.bio,
            repos: dataObj.repos
          });
      }.bind(this));
  },
  componentDidMount: function(){
    this.ref = new Firebase('https://tw-uganda.firebaseio.com/');
    this.init();
  },
  componentWillUnMount: function(){
    this.unbind('notes')
  },
  componentWillReceiveProps: function(){
    this.unbind('notes');
    this.init();
  },
  handleAddNote: function(newNote){
    this.ref.child(this.getParams().username).set(this.state.notes.concat([newNote]));
  },
  render: function() {
    var username = this.getParams().username;
    return (
      <div className='row'>
        <div className='col-md-4'>
          <UserProile username={username} bio={this.state.bio}/>
        </div>
         <div className='col-md-4'>
          <Repos username={username} repos={this.state.repos}/>
        </div>
         <div className='col-md-4'>
          <Notes
           username={username} 
           notes={this.state.notes}
           addNote={this.handleAddNote}/>
        </div>
      </div>
    )
  }
});

module.exports = Profile;