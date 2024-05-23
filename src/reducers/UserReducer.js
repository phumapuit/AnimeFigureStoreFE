import {
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAIL,
  CHANGE_STATUS_USER_REQUEST,
  CHANGE_STATUS_USER_SUCCESS,
  CHANGE_STATUS_USER_FAIL,
  GET_USER_ROLE_LIST_REQUEST,
  GET_USER_ROLE_LIST_SUCCESS,
  GET_USER_ROLE_LIST_FAIL, RESET_USER_DETAIL,
} from "./constants/user";
const initialUserState = {
  usersList: [],
  rolesList: [],
  userDetail: null,
  loading: false,
  error: null,
  errorAddUser: null,
  errorUpdateUser:null,
  errorChangeStatusUser:null,
};
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case GET_USER_LIST_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case GET_USER_LIST_SUCCESS: {
      return {
        ...state,
        usersList: action.payload.data.data,
        loading: false,
        error: null,
      };
    }
    case GET_USER_LIST_FAIL: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }

    case GET_USER_ROLE_LIST_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case GET_USER_ROLE_LIST_SUCCESS: {
      return {
        ...state,
        rolesList: action.payload.data.data,
        loading: false,
        error: null,
      };
    }
    case GET_USER_ROLE_LIST_FAIL: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }

    case GET_USER_DETAIL_REQUEST: {
      return {...state}
    }
    case GET_USER_DETAIL_SUCCESS: {
      return {
        ...state,
        userDetail: action.payload.data.data,
      };
    }
    case GET_USER_DETAIL_FAIL: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case RESET_USER_DETAIL:{
      return {
        ...state,
        userDetail: null
      }
    }
      //
    case CHANGE_STATUS_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    }
    case CHANGE_STATUS_USER_SUCCESS: {
      const { arrUserId } = action.payload;
      return {
        ...state,
        usersList: state.usersList.map((user) => (arrUserId.includes(user.userId) ? { ...user, deleted: !user.deleted } : user)),
        loading: false,
      };
    }
    case CHANGE_STATUS_USER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

      case UPDATE_USER_REQUEST: {
        return {
          ...state,
          errorUpdateUser: null,
        };
      }
      case UPDATE_USER_SUCCESS: {
        const userUpdate = action.payload.data.data;
        console.log(userUpdate)
        const newUserList = state.usersList.map((user) => {
          if (user['userId'] === userUpdate['userId']){
            return userUpdate;
          }
          return user;
        })
        return {
          ...state,
          usersList: newUserList,
          loading: false,
        };
      }
      case UPDATE_USER_FAIL: {
        return {
          ...state,
          errorUpdateUser: action.payload.error,
        };
      }

    case ADD_USER_REQUEST: {
      return {
        ...state,
        errorAddUser: null,
      };
    }
    case ADD_USER_SUCCESS: {
      const userAdd = action.payload.data.data;
      return {
        ...state,
        usersList: [...state.usersList, userAdd],
        errorAddUser: null,
      };
    }
    case ADD_USER_FAIL: {
      return {
        ...state,
        errorAddUser: action.payload.error,
      };
    }
    default:
      return state;
  }
};
export default userReducer;
