import React from 'react';
import Layout from './components/Layouts/Layout';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './components/authentication/SignUp';
function App() {
	return (
		<div className='App'>
			<Layout>
				<Router>
					<Route path='/clients' />
					<Route path='/signup' />
					<Route path='/signin' />
				</Router>
				<SignUp />
			</Layout>
		</div>
	);
}

export default App;
