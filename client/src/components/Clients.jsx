import React, { Component } from 'react';
import styled from 'styled-components';

function Search({}) {
	const [search, setSearch] = React.useState('');
	const [results, setResults] = React.useState({});
	const onSubmit = e => {
		e.preventDefault();
		fetch(`http://www.omdbapi.com/?s=${search}&apikey=8f73e7a1`)
			.then(res => res.json())
			.then(res => {
				setResults({ ...res });
			});
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type='text' onChange={e => setSearch(e.target.value)} />
				<button type='submit'>Submit</button>
			</form>
			<pre>{JSON.stringify(results, null, 2)}</pre>
		</div>
	);
}

const SignUpForm = styled.div`
	height: 500px;
	margin: auto;
`;
export default class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			results: {}
		};
	}
	onSubmit = e => {
		e.preventDefault();
		fetch(`http://www.omdbapi.com/?s=${this.state.search}&apikey=8f73e7a1`)
			.then(res => res.json())
			.then(res => {
				this.setState({ ...this.state, results: { ...res } });
			});
	};
	onChange = e => {
		this.setState({ ...this.state, search: e.target.value });
	};

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input type='text' onChange={this.onChange} />
					<button type='submit'>Submit</button>
				</form>
				<pre>{JSON.stringify(this.state.results, null, 2)}</pre>
			</div>
		);
	}
}
