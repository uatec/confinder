var React = require('react');
var ReactDOM = require('react-dom');

var Provider = require('react-redux').Provider;
var Redux = require('redux'),
    createStore = Redux.createStore,
	applyMiddleware = Redux.applyMiddleware;
var reducers = require('../src/reducers');

require('react-tap-event-plugin')();


var Home = require('../src/pages/Home.jsx');
var thunkMiddleware = require('redux-thunk').default;

var store = createStore(reducers,
    applyMiddleware(
        thunkMiddleware
    ));

var actions = require('../src/actions');

store.dispatch(actions.fetchConferences());

store.subscribe(function() {
	console.log(store.getState());
});

// store.dispatch(actions.receiveConferences([
// 		{
// 			id: '0', 
// 			name: 'DevOpsDays London 2016',
// 			location: {
// 				lat: 51.512761,
// 				lng: -0.099792
// 			},
//       url: 'http://www.devopsdays.org/events/2016-london/'
// 		},
// 		{
// 			id: '1', 
// 			name: 'Kubecon 2016',
// 			location: {
// 				lat: 51.518366,
// 				lng:  -0.086191
// 			},
//       url: 'https://kubecon.io/'
// 		}
// ]));

var renderTarget = document.getElementById("content");

ReactDOM.render(
		<Provider store={store}>
			<Home />
		</Provider>,
		renderTarget
);