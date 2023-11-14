import graphqlLogo from './assets/graphql-logo.png';
import apollo from './assets/apollo.svg';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const GET_USERS = gql`
	query getUsers {
		users {
			id
			username
			password
			email
			privilege
			active
			createdAt
			updatedAt
		}
	}
`;

function App() {
	const [ formType, setFormType ] = useState('logIn');
	const { loading, error, data } = useQuery(GET_USERS);

	const handleSubmit = (event) => {
		event.preventDefault()
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries())

		console.log(data);
	}

	return (
		<main
			className='flex justify-center items-center h-screen flex-col bg-custom-bg-darker text-white'>
			<header className='flex flex-wrap justify-center items-center gap-2'>
				<img src={apollo} alt='apollo logo' width={32} height={32} />
				<h1 className='text-xl md:text-3xl font-semibold py-4'>Apollo GraphQL Frontend App</h1>
				<img src={graphqlLogo} alt='logo' width={32} height={32} />
			</header>
			<section className='w-5/6 sm:w-1/2 xl:w-1/4 rounded-lg shadow border bg-custom-bg border-gray-700 p-6'>
				<nav className='flex justify-center text-center pb-4'>
					<button
						className={`${formType === 'logIn' ? 'bg-primary-600' : 'bg-gray-700'} flex-grow cursor-pointer hover:bg-primary-600 outline-0 focus:border-primary-800 focus:ring-primary-800 focus:ring-1 border-gray-600 border-[1px] rounded-l-lg py-2.5`}
						name="logIn"
						onClick={(e) => setFormType(e.target.name)}
					>
						Log in
					</button>
					<button
						className={`${formType === 'signIn' ? 'bg-primary-600' : 'bg-gray-700'} flex-grow cursor-pointer hover:bg-primary-600 outline-0 focus:border-primary-800 focus:ring-primary-800 focus:ring-1 border-gray-600 border-[1px] rounded-r-lg py-2.5`}
						name="signIn"
						onClick={(e) => setFormType(e.target.name)}
					>
						Sign up
					</button>
				</nav>
				<form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
					<label className='block mb-2 text-sm font-medium text-white'>
						E-mail
						<input
							type='email'
							name='email'
							className="bg-gray-700 block border w-full p-2.5 mt-1 rounded-lg outline-0 focus:border-primary-600 border-gray-600 valid:border-primary-700"
							placeholder='user@apollo.com'
							required
						/>
					</label>
					<label className='block mb-2 text-sm font-medium text-white'>
						Password
						<input
							type='password'
							name='password'
							placeholder='••••••••'
							className='bg-gray-700 block border w-full p-2.5 mt-1 rounded-lg outline-0 focus:border-primary-600 border-gray-600 valid:border-primary-700'
							required
						/>
					</label>
					{
						formType === 'signIn' && (
							<label className='block mb-2 text-sm font-medium text-white'>
								Confirm Password
								<input
									type='password'
									name='confirm-password'
									placeholder='••••••••'
									className='bg-gray-700 block border w-full p-2.5 mt-1 rounded-lg outline-0 focus:border-primary-600 border-gray-600 valid:border-primary-700'
									required
								/>
							</label>
						)
					}
					<button
						type='submit'
						className='w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
						GO!
					</button>
				</form>
			</section>
			{loading && <p>Loading...</p>}
			{error && <p>Something goes wrong :/</p>}
			{data && (
				data.users.map(user => (
					<ul className='list-disc' key={user.id}>
						<li>Email: {user.email}</li>
						<li>Username: {user.username}</li>
					</ul>
				))
			)}
		</main>
	);
}

export default App;
