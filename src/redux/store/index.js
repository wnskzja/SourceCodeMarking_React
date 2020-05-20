import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers/index";

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");
  middleware.push(createLogger({ collapsed: true }));
}

// if (process.env.NODE_ENV === 'development' && module.hot) {
//     module.hot.accept('reducers/rootReducer', () => {
//         const updatedReducer = require('reducers/rootReducer').default;
//         store.replaceReducer(updatedReducer);
//     });
// }

const store = createStore(reducers, applyMiddleware(...middleware));

export { store };
