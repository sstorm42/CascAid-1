import { Component } from 'react';
import { connect } from 'react-redux';
import { userSignOut } from '@Actions';
import * as RoutePath from '@Constants/route-paths';

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
