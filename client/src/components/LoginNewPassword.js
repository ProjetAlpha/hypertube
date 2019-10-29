import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginNewPasswordUser } from '../actions/authentication';

import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Grid, Paper, Typography } from '@material-ui/core';
import Legals from './Legals';

  const styles = theme => ({
    root: {
        height: '100vh'
    },
    image: {
        height: '100vh',
        width: '100%',
        opacity: '0.8',
        objectFit: 'cover',
        objectPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw'
    },
    legals: {
        margin: theme.spacing(0, 4),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100vw'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(7, 0, 2)
    },
    subtitle: {
        margin: theme.spacing(4, 0, 0, 0)
    }
});

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

class LoginNewPassword extends Component {

    constructor() {
        super();
        this.state = {
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            password: this.state.password,
            password_confirm: this.state.password_confirm,
        }
        this.props.loginNewPasswordUser(user);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
                password: '',
                password_confirm: ''
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { password, password_confirm, errors } = this.state;

        return (
            <Grid container component="main" className={classes.root} >

                <Grid item xs={false} sm={4} md={7} className="bgGradient">
                    <img
                        src="https://source.unsplash.com/collection/1736993"
                        alt="Movie"
                        className={classes.image}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square container>
                    <div className={classes.paper}>
                        <img
                            src="/logo.png"
                            alt="Logo Hypertube"
                            height="80px"
                            width="auto"
                            className="mb-5"
                        />
                        <Typography component="h1" variant="h5">
                            Nouveau mot de passe
                        </Typography>
                        <Typography component="h2" variant="subtitle1" className={classes.subtitle}>
                            Vous pouvez maintenant réinitialiser votre mot de passe.
                        </Typography>
                        <form className={classes.form} onSubmit={ this.handleSubmit }>
                            <TextField
                                name="password"
                                label="Mot de passe"
                                type="password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password
                                })}
                                value={password}
                                onChange={this.handleInputChange}
                                inputProps={{
                                    minLength: 7,
                                    maxLength: 30
                                }}
                                variant="filled"
                                margin="normal"
                                autoComplete="current-password"
                                required
                                fullWidth
                            />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            <TextField
                                name="password_confirm"
                                label="Confirmation mot de passe"
                                type="password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password
                                })}
                                // helperText="Le mot de passe doit contenir au moins 7 caractères avec des chiffres et des lettres minuscules et majuscules"
                                value={password_confirm}
                                onChange={this.handleInputChange}
                                inputProps={{
                                    minLength: 7,
                                    maxLength: 30
                                }}
                                variant="filled"
                                margin="normal"
                                autoComplete="current-password"
                                required
                                fullWidth
                            />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                fullWidth
                            >
                                Confirmer
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link component={AdapterLink} to="/login" color="primary">
                                        Retour
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <div className={classes.legals}>
                        <Legals />
                    </div>
                </Grid>
            </Grid>
        );
    }
}

LoginNewPassword.propTypes = {
    loginNewPasswordUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginNewPasswordUser })(withStyles(styles)(LoginNewPassword))