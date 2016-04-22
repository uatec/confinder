var React = require('react');
var ReactDOM = require('react-dom');

var Fluxxor = require('fluxxor');
var ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    Router = ReactRouter.Router,
    browserHistory = ReactRouter.browserHistory;

require('react-tap-event-plugin')();


var Home = require('./pages/Home.jsx');

ReactDOM.render(
    <Home />,
    document.getElementById("content")
);