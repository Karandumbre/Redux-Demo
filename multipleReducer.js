const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const reduxLogger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM"

function buy_cake() { //action creator is a function which returns an action
    return {
        type: BUY_CAKE,
        info: 'First Redux Action'
    }
}

function buy_icecream() { //action creator is a function which returns an action
    return {
        type: BUY_ICECREAM,
        info: 'First Redux Action'
    }
}

function add_cake() {
    return {
        type: "ADD_CAKE",
        info: "Addition of Cake in store"
    }
}

function add_icecream() {
    return {
        type: "ADD_ICECREAM",
        info: "Addition of Ice Cream in store"
    }
}

// (previousState,Action) => newState

const initialCakeState = {
    numberOfCakes: 10
}

const initialIceCreamState = {
    numberOfIceCreams: 20
}

// Instead of Single State, maintain multipe state objects

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case "BUY_CAKE":
            return {
                ...state, //Copy the previous state and only change what is need to
                numberOfCakes: state.numberOfCakes - 1
            }
            break;

        case "ADD_CAKE":
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + 1
            }
            break;

        default:
            return state;
            break;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case "BUY_ICECREAM":
            return {
                ...state, //Copy the previous state and only change what is need to
                numberOfIceCreams: state.numberOfIceCreams - 1
            }
            break;

        case "ADD_ICECREAM":
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams + 1
            }
            break;

        default:
            return state;
            break;

    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

// 1.Redux store holding application state
const store = createStore(rootReducer, applyMiddleware(logger));

// 2.Initial state of application
console.log('Initial State', store.getState());

// 4.Allow the app to subscribe for changes in the store
const unsubscribe = store.subscribe(() => {})

// 3.Dispatch method to update the store (store method)
store.dispatch(buy_cake())
store.dispatch(buy_cake())
store.dispatch(buy_cake())

store.dispatch(add_cake())
store.dispatch(add_cake())
store.dispatch(add_cake())

store.dispatch(buy_icecream())
store.dispatch(buy_icecream())
store.dispatch(buy_icecream())

store.dispatch(add_icecream())

// 5. Unsubscribing to the listener
unsubscribe();