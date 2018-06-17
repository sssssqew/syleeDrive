import React from 'react';
import ReactDOM from 'react-dom';
import { App, Home } from 'containers';
import  { IndexRoute, Router, Route, hashHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
		</Route>
	</Router>
)
ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
