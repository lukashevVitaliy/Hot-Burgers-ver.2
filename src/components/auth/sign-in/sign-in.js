import { React, Component } from 'react';
import { GithubAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

import auth from '../../../firebase';
import Login from '../login/login';


class SignIn extends Component {
	state = {
		user: ''
	}

	componentDidMount() {
		onAuthStateChanged(auth, user => {
			if (user) {
				this.authHandler({ user })
			}
		});
	}

	authHandler = async (data) => {
		const { email } = data.user;
		this.setState({ user: email });
	}

	authenticate = () => {
		const provider = new GithubAuthProvider();
		signInWithPopup(auth, provider)
			.then(this.authHandler)
			.catch(error => {
				// const errorCode = error.code;
				const errorMessage = error.message;
				// const email = error.email;
				// const credential = GithubAuthProvider.credentialFromError(error);
				console.log(errorMessage);
			})
	}

	render() {

		if (!this.state.user) {
			return <Login authenticate={this.authenticate} />
		}

		return this.props.children
	}
}

export default SignIn;