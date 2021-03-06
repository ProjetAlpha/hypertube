import React from 'react';
import extractParamsUrl from '../validation/extractParams';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { registerValidationUser } from '../actions/authentication';
import styles from '../css/public';
import Loader from './Loader';

class RegisterValidation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
        this.validationAccount();
    }

    validationAccount = () => {
        const getParams = extractParamsUrl(this.props.location.search)
        const user = {
            username: getParams.username,
            token: getParams.key
        };
        this.props.registerValidationUser(user)
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div className="RegisterValidation">
                {Loader(isLoading)}
            </div>
        );
    }
}

RegisterValidation.propTypes = {
    registerValidationUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerValidationUser })(withStyles(styles)(RegisterValidation))
