import React from 'react';
import { useFormik, Field } from 'formik';
import { TextField, InputLabel, Button } from '@material-ui/core';
import { css } from 'emotion';

export default function SignUp() {
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			password: '',
			email: ''
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		}
	});
	return (
		<form
			className={css`
				height: 500px;
				width: 600px;
				margin: auto;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				button {
					align-self: flex-end;
					width: 100px;
				}
			`}
			onSubmit={formik.handleSubmit}>
			<h1>Sign Up</h1>
			<InputLabel />
			<TextField
				name='firstName'
				label='First Name'
				onChange={formik.handleChange}
				value={formik.values.firstName}
			/>
			<TextField
				name='lastName'
				label='Last Name'
				onChange={formik.handleChange}
				value={formik.values.lastName}
			/>
			<TextField
				type='email'
				name='email'
				label='Email'
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			<TextField
				type='password'
				name='password'
				label='Password'
				onChange={formik.handleChange}
				value={formik.values.password}
			/>
			<Button variant='contained' color='primary' type='submit'>
				Submit
			</Button>
		</form>
	);
}
