import { combineReducers } from "redux";
import AuthReducer from "../reducers/authenticationReducer";
export default combineReducers({
  user: AuthReducer
});
