import { combineReducers } from "redux";
import cart from './cartReducer';
import userloginstatus from './userReducer'

const rootReducer = combineReducers({
    cart,userloginstatus
});

export default rootReducer;
