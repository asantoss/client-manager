import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

export default function Layout({ children }) {
	return (
		<LayoutStyled>
			<header>
				<div className='logo'></div>
				<a href=''>Home</a>
				<a href=''>Clients</a>
				<a href=''>Reviews</a>
				<a href=''>About</a>
			</header>
			<main>{children}</main>
			<footer>
				<a href=''>Home</a>
				<a href=''>Clients</a>
				<a href=''>Reviews</a>
				<a href=''>About</a>
			</footer>
		</LayoutStyled>
	);
}

const LayoutStyled = styled.div`
	width: 90vw;
	max-width: 768px;
	margin: auto;
	header {
		display: flex;
		justify-content: space-evenly;
	}
	footer {
		display: flex;
		flex-direction: column;
	}
	main {
		display: flex;
		height: 80vh;
		width: 100%;
		overflow-y: scroll;
	}
`;
