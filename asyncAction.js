const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const reduxLogger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const reduxThunkMiddleware = require('redux-thunk').default;
const axios = require('axios')


const initialState = {
    loading: true,
    users: [],
    error: ''
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USER_REQUEST":
            return {
                ...state,
                loading: true
            }
            break;

        case "FETCH_USER_SUCCESS":
            return {
                ...state, loading: false, users: action.payload, error: ''
            }
            break;

        case "FETCH_USER_FAILURE":
            return {
                ...state, loading: false, users: [], error: action.payload
            }
            break;

        default:
            return state;
            break;
    }
}


// with use of thunk, action can return a function instead of a object and also can dispatch actions

const fetchUser = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest());

        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
            const users = res.data.map(user => user.id);
            dispatch(fetchUserSuccess(users))
        }).catch(error => {
            dispatch(fetchUserFailure(error.message))
        });

    }
}



const store = createStore(reducer, applyMiddleware(reduxThunkMiddleware, logger));

const unsubscribe = store.subscribe(() => {})

store.dispatch(fetchUser())

unsubscribe();