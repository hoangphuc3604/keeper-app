import authReducer from "./reducers/authReducer";
import ideaReducer from "./reducers/ideaReducer";

const rootReducer = {
  auth: authReducer,
  idea: ideaReducer,
};

export default rootReducer;
