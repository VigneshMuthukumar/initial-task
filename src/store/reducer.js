import UserJson from "../data/people.json";

const initialState = {
  userData: UserJson.People,
  modalOpen: false,
  currentUser: false
};

const reducer = (state = initialState, action) => {
  if (action.type === "UPDATE") {
    return {
      ...state,
      userData: action.userData
    };
  }
  if (action.type === "MODAL") {
    return {
      ...state,
      modalOpen: action.modalOpen
    };
  }
  if (action.type === "CURRENT_SELECTION") {
    return {
      ...state,
      currentUser: action.currentUser
    };
  }

  return state;
};

export default reducer;
