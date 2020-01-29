import React from 'react';
import { Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { css } from 'emotion';

export default function Layout({ children }) {
	return (
		<div
			className={css`
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
				}
			`}>
			<header>
				<div className='logo'></div>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/clients'>Clients</NavLink>
				<NavLink to='/reviews'>Reviews</NavLink>
				<NavLink to='/about'>About</NavLink>
				<NavLink to='/signup'>Sign Up</NavLink>
			</header>
			<main>{children}</main>
			<footer>
				<a href=''>Home</a>
				<a href=''>Clients</a>
				<a href=''>Reviews</a>
				<a href=''>About</a>
			</footer>
		</div>
	);
}
