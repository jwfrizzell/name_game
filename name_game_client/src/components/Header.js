import React, { Component } from "react";
import {
	Header as H,
	Container,
	Icon,
	Grid,
	Popup,
	Image
} from "semantic-ui-react";
import { login, logout, isLoggedIn } from "utils/AuthService";
import styles from "styles/Header.js";
import imgSrc from "images/faceless.png";

class Header extends Component {
	isUserAuthenticated = () => {
		if (!isLoggedIn()) {
			return (
				<div>
					<a onClick={login}>
						<Popup
							size="large"
							trigger={
								<Icon
									style={{ float: "right" }}
									id="id-auth"
									size="large"
									color="red"
									inverted
									name="user circle"
									circular
								/>
							}
						>
							Sign In!
						</Popup>
					</a>
				</div>
			);
		} else {
			return (
				<div>
					<a onClick={logout}>
						<Popup
							size="large"
							trigger={
								<Icon
									style={{ float: "right" }}
									id="id-auth"
									size="large"
									color="green"
									inverted
									name="user circle"
									circular
								/>
							}
						>
							Sign Out!
						</Popup>
					</a>
				</div>
			);
		}
	};

	render() {
		return (
			<Container>
				<H style={styles.header} block color="grey">
					<Grid>
						<Grid.Row>
							<Grid.Column width={8}>
								<Image circular src={imgSrc} />
							</Grid.Column>
							<Grid.Column width={8}>
								{this.isUserAuthenticated()}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</H>
			</Container>
		);
	}
}

export default Header;
