import React from 'react';
import Layout from './components/Layouts/Layout';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './components/authentication/SignUp';
import Search from './components/Clients';
function App() {
	return (
		<div className='App'>
			<Layout>
				<Router>
					<Route path='/clients' component={Search} />
					<Route path='/signup' component={SignUp} />
					<Route path='/signin' />
				</Router>
			</Layout>
		</div>
	);
}

export default App;
