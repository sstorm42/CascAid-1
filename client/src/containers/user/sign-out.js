import { Component } from "react";
import { connect } from "react-redux";
import { userSignOut } from "../../actions";
import * as RoutePath from "../../constants/route-paths";

class SignOut extends Component {
	componentDidMount() {
		this.props.dispatch(userSignOut());
		this.props.history.push(RoutePath.signInPage);
	}

	render() {
		return null;
	}
}

export default connect()(SignOut);
