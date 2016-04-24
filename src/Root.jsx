var React = require('react');
var ReactDOM = require('react-dom');
require('react-tap-event-plugin')();

var Provider = require('react-redux').Provider;

var Redux = require('redux'),
    createStore = Redux.createStore,
	applyMiddleware = Redux.applyMiddleware;

var thunkMiddleware = require('redux-thunk').default;

var Home = require('./pages/Home.jsx');

var reducers = require('./reducers');
var actions = require('./actions');

module.exports = React.createClass({
	componentWillMount: function() {
		console.log('preparing stores for Root');
		this.store = createStore(reducers,
			applyMiddleware(
				thunkMiddleware
			));

		this.store.dispatch(actions.fetchConferences());
	},
	
	render: function() {
		console.log('rendering...');
		console.log('p ' + Provider);
		console.log('h ' + Home);
		
		return <Provider store={this.store}>
				<Home />
			</Provider>;
	}
});