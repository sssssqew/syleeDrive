import React from 'react';
import ReactDOM from 'react-dom';
import { App, Home } from 'containers';
import  { IndexRoute, Router, Route, hashHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';


const store = createStore(reducers, applyMiddleware(thunk));

// console.log(store.getState());

// // store가 변경될때마다 실행됨 
// store.subscribe( () => console.log("changed: " , store.getState()));

const routes = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
			</Route>
		</Router>
	</Provider>
)
ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
