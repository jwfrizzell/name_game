import React, { Component } from "react";
import { Icon, Form, Button } from "semantic-ui-react";
import { login, isLoggedIn } from "utils/AuthService";

import styles from "styles/Login.js";

export default class Login extends Component {
	componentDidMount() {
		if (isLoggedIn()) {
			this.props.history.push("/");
		}
	}
	onSubmit = () => {
		login();
	};
	render() {
		return (
			<div>
				<Form style={styles.form} onSubmit={this.onSubmit}>
					<div>
						<Icon name="user outline" circular size="massive" />
					</div>
					<div style={styles.loginBtn}>
						<Button primary content="Login" size="medium" />
					</div>
				</Form>
			</div>
		);
	}
}
