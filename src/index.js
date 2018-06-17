import React from 'react';
import ReactDOM from 'react-dom';
import  { IndexRoute, Router, Route, hashHistory } from 'react-router';
import { App, FileUpload } from 'containers';
import registerServiceWorker from './registerServiceWorker';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="/projects" components={Projects}/>
			<Route path="/aboutMe" components={AboutMe}/>
		</Route>
	</Router>
)
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
