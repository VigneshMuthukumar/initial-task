import { createStore } from "redux";
import reducer from "./reducer";

// Added to inspect redux from devtools
const store = createStore(
  reducer,
  window.devToolsExtension && window.devToolsExtension()
);

export default store;
