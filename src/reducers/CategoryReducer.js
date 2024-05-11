// import { GET_USER_LIST_REQUEST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAIL } from './constants/User';
const initialState = {
  categoryList: [],
  loading: false,
  error: null,
}
//
const categoryReducer = (state = initialState, action) => {
  return 1
//   switch (action.type) {
//     case GET_USER_LIST_REQUEST: {
//       return { ...state, loading: true, error: null };
//     }
//     case GET_USER_LIST_SUCCESS: {
//       return {
//         ...state,
//         usersList: action.payload.data,
//         loading: false
//       };
//     }
//     case GET_USER_LIST_FAIL: {
//       return {
//         ...state,
//         error: action.payload.error,
//         loading: false,
//       };
//     }
//
//     case DELETE_USER_REQUEST: {
//       return {
//         ...state, loading: true, error: null, message: null
//       }
//     }
//     case DELETE_USER_SUCCESS: {
//       // xóa thành công chỉ trả về câu commnet thành công nên không cần thiết phải in ra
//       const index = state.usersList.findIndex(user => user.taiKhoan === action.payload.userSelected)
//       state.usersList.splice(index, 1)
//       return {
//         ...state, loading: false
//       }
//     }
//     case DELETE_USER_FAIL: {
//       return {
//         ...state, loading: false, error: action.payload.error
//       }
//     }
//
//     case UPDATE_USER_REQUEST: {
//       return {
//         ...state, loading: true, error: null,
//       }
//     }
//     case UPDATE_USER_SUCCESS: {
//       const userUpdate = action.payload.userSelected
//       // const userUpdate = action.payload.data vì data trả về ko có soDt và maLoaiNguoiDung nên ko thể dùng
//       const index = state.usersList.findIndex(user => user.taiKhoan === userUpdate.taiKhoan)
//       state.usersList[index] = userUpdate
//       return {
//         ...state, loading: false
//       }
//     }
//     case UPDATE_USER_FAIL: {
//       return {
//         ...state, loading: false, error: action.payload.error
//       }
//     }
//
//     case ADD_USER_REQUEST: {
//       return {
//         ...state, loading: true, error: null
//       }
//     }
//     case ADD_USER_SUCCESS: {
//       const userAdd = action.payload.userAdd
//       state.usersList.unshift(userAdd)
//       return {
//         ...state, loading: false
//       }
//     }
//     case ADD_USER_FAIL: {
//       return {
//         ...state, loading: false, error: action.payload.error
//       }
//     }
//     default:
//       return state;
//   }
}
export default categoryReducer;