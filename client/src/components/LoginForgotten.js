import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginForgottenUser } from '../actions/authentication';

import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Grid, Paper, Typography, Box } from '@material-ui/core';
import Legals from './Legals';

  const styles = theme => ({
    root: {
        height: '100vh'
    },
    subtitle: {
        margin: theme.spacing(4, 0, 0, 0)
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
        margin: theme.spacing(3, 0, 2)
    }
});

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

class LoginForgotten extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            send: false,
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
            email: this.state.email,
        }
        this.props.loginForgottenUser(user);
        console.log(this.state.errors);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ 
                errors: nextProps.errors,
                email: ''
            });
        }
    }

    beforeSubmit = () => {
        const { classes } = this.props;
        const { email, errors } = this.state;

        return (
            <div>
                <Typography component="h2" variant="subtitle1" className={classes.subtitle}>
                    Saisissez l’adresse email de votre compte afin de recevoir des instructions pour réinitialiser votre mot de passe.
                </Typography>
                <TextField
                    name="email"
                    label="Adresse email"
                    value={email}
                    onChange={this.handleInputChange}
                    inputProps={{
                        minLength: 3,
                        maxLength: 50
                    }}
                    variant="filled"
                    margin="normal"
                    autoFocus
                    fullWidth
                    required
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    fullWidth
                >
                    Continuer
                </Button>
            </div>
        );
    }

    afterSubmit = () => {
        const { classes } = this.props;

        return (
            <div>
                <Typography className={classes.subtitle}>
                    Un email vient de vous être envoyé à cette adresse (vérifiez vos spam):
                </Typography>
                <Paper>
                    <Box m={3} p={3} textAlign="center">
                        {this.state.email}
                    </Box>
                </Paper>
                <Typography paragraph>
                    Pour réinitialiser votre mot de passe veuillez cliquer dans cet email et suivre les instructions. Attention le lien dans l’email expirera rapidement. Pensez donc à vérifier dès maintenant !<br />
                </Typography>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        const { send } = this.state;
        const content = (send) ? this.afterSubmit() : this.beforeSubmit();

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
                            Mot de passe oublié ?
                        </Typography>

                        <form className={classes.form} onSubmit={ this.handleSubmit }>
               
                            {content}

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

LoginForgotten.propTypes = {
    loginForgottenUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginForgottenUser })(withStyles(styles)(LoginForgotten))