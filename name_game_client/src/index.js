import React from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import App from "components/App.js";
import Welcome from "components/Welcome.js";
import Callback from "utils/AuthCallback.js";
import Login from "components/Login.js";

ReactDOM.render(
	<Router>
		<App {...this.props}>
			<Switch>
				<Route exact path="/" component={Welcome} />
				<Route path="/callback" component={Callback} />
				<Route path="/login" component={Login} />
				<Redirect to="/" />
			</Switch>
		</App>
	</Router>,
	document.querySelector("#root")
);
