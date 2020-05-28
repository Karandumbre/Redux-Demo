const redux = require('redux');
const createStore = redux.createStore;
const BUY_CAKE = "BUY_CAKE";

function buy_cake() { //action creator is a function which returns an action
    return {
        type: BUY_CAKE,
        info: 'First Redux Action'
    }
}

function add_cake() {
    return {
        type: "ADD_CAKE",
        info: "Addition of Cake in store"
    }
}

// (previousState,Action) => newState

const initialState = {
    numberOfCakes: 10
}

const reducer = (state = initialState, action) => {
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
// 1.Redux store holding application state
const store = createStore(reducer);

// 2.Initial state of application
console.log('Initial State', store.getState());

// 4.Allow the app to subscribe for changes in the store
const unsubscribe = store.subscribe(() => {
    console.log('Updated Changes', store.getState())
})

// 3.Dispatch method to update the store (store method)
store.dispatch(buy_cake())
store.dispatch(buy_cake())
store.dispatch(buy_cake())

store.dispatch(add_cake())
store.dispatch(add_cake())
store.dispatch(add_cake())

// 5. Unsubscribing to the listener
unsubscribe();