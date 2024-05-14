import usersAPI from '../../api/usersAPI';
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, GET_USER_LIST_REQUEST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAIL } from '../constants/user';
//
// export const login = (user) => {
//     return (dispatch) => {
//         dispatch({
//             type: LOGIN_REQUEST
//         })
//         usersApi.postDangNhap(user)
//             .then(result => {
//                 localStorage.setItem("user", JSON.stringify(result.data));
//                 dispatch({
//                     type: LOGIN_SUCCESS,
//                     payload: { data: result.data }
//                 })
//             })
//             .catch(
//                 error => {
//                     dispatch({
//                         type: LOGIN_FAIL,
//                         payload: { error: error.response.data }
//                     })
//                 }
//             )
//     }
// }
//
// export const register = (user) => {
//     return (dispatch) => {
//         dispatch({
//             type: REGISTER_REQUEST
//         })
//         usersApi.postDangKy(user)
//             .then(result => {
//                 localStorage.setItem("user", JSON.stringify(result.data));
//                 dispatch({
//                     type: REGISTER_SUCCESS,
//                     payload: { data: result.data }
//                 })
//             })
//             .catch(
//                 error => {
//                     dispatch({
//                         type: REGISTER_FAIL,
//                         payload: { error: error.response.data }
//                     })
//                 }
//             )
//     }
// }

export const getUsersList = () => {
    return (dispatch) => {
        dispatch({
            type: GET_USER_LIST_REQUEST
        })
        usersAPI.getUserList()
            .then(result => {
                dispatch({
                    type: GET_USER_LIST_SUCCESS,
                    payload: { data: result.data }
                })
            })
            .catch(
                error => {
                    dispatch({
                        type: GET_USER_LIST_FAIL,
                        payload: { error: error.response?.data, }
                    })
                }
            )
    }
}

// export const deleteUser = (taiKhoanUser) => {
//     return (dispatch) => {
//         dispatch({
//             type: DELETE_USER_REQUEST
//         })
//         usersApi.deleteXoaNguoiDung(taiKhoanUser)
//             .then(result => {
//                 dispatch({
//                     type: DELETE_USER_SUCCESS,
//                     payload: {
//                         data: result.data,
//                         userSelected: taiKhoanUser
//                     },
//                 })
//             })
//             .catch(
//                 error => {
//                     dispatch({
//                         type: DELETE_USER_FAIL,
//                         payload: { error: error.response.data, }
//                     })
//                 }
//             )
//     }
// }
//
// export const putUserUpdate = (user) => {
//     return (dispatch) => {
//         dispatch({
//             type: UPDATE_USER_REQUEST
//         })
//         usersApi.editTaiKhoan(user)
//             .then(result => {
//                 dispatch({
//                     type: UPDATE_USER_SUCCESS,
//                     payload: {
//                         data: result.data,
//                         userSelected: user
//                     }
//                 })
//             })
//             .catch(
//                 error => {
//                     dispatch({
//                         type: UPDATE_USER_FAIL,
//                         payload: { error: error.response.data, }
//                     })
//                 }
//             )
//     }
// }
//
// export const addUser = (user) => {
//     return (dispatch) => {
//         dispatch({
//             type: ADD_USER_REQUEST
//         })
//         usersApi.postThemNguoiDung(user)
//             .then(result => {
//                 dispatch({
//                     type: ADD_USER_SUCCESS,
//                     payload: {
//                         data: result.data,
//                         userAdd: user
//                     }
//                 })
//             })
//             .catch(error => {
//                 dispatch({
//                     type: ADD_USER_FAIL,
//                     payload: { error: error.response.data }
//                 })
//             })
//     }
// }