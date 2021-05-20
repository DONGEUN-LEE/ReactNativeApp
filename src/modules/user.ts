const SET_LOGIN = "user/SET_LOGIN";

export const setLogin = (login: boolean) => ({ type: SET_LOGIN, login });

const initialState = {
  isLogin: false,
};

export default function user(state = initialState, action: { type: string; login: boolean }) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLogin: action.login,
      };
    default:
      return state;
  }
}
