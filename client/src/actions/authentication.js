import axios from 'axios';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import { 
    GET_ERRORS, 
    SET_CURRENT_USER, 
    GET_SEND
} from './types'

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const registerValidationUser = (user) => dispatch => {
    axios.post('/api/users/registerValidation', user)
            .then(res => {
                sessionStorage.setItem('alert_success', 'Votre compte a été confirmé !');
                window.location.href = '/login'
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}



export const loginUser = (user) => dispatch => {
    axios.post('/api/users/login', user)
            .then(res => {
				const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
				const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}


export const loginForgottenUser = (user) => dispatch => {
    axios.post('/api/users/loginForgotten', user)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: GET_SEND,
                    payload: true
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginNewPasswordUser = (user) => dispatch => {
    axios.post('/api/users/loginNewPassword', user)
            .then(res => {
				console.log(res);
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginCheckNewPasswordUser = (user) => dispatch => {
    axios.post('/api/users/loginCheckNewPassword', user)
            .then(res => {
                console.log(res);
                if (res.data === 'KO')
                    window.location.href = '/login';
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    // history.push('/login');
    window.location.href = '/login';
}
