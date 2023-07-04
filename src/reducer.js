export const Data = {
  getData: "",
  setError: "",
  userDetail: undefined,
  loading: false,
  INPUT_VAL: "",
  todoArr: undefined,
  spinner: false,
};

export const reduceHandler = (users, action) => {
  switch (action.type) {
    case "SET-USER-DETAIL":
      return { ...users, userDetail: action.setData, loading: false };
    case "LOADING":
      return { ...users, loading: true };
    case "ERROR":
      return { ...users, setError: action.err };
    case "GIVE_INPUT_VAL":
      return { ...users, INPUT_VAL: action.giveInput };
    case "SET_TODO_ARR":
      return { ...users, todoArr: action.setArr };
    case "SPINNER_ON":
      return { ...users, spinner: true };
    case "SPINNER_OFF":
      return { ...users, spinner: false };
    default:
      return users;
  }
};
