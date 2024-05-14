import productsAPI from '../../api/productsAPI';
import {GET_PRODUCT_LIST_FAIL, GET_PRODUCT_LIST_REQUEST, GET_PRODUCT_LIST_SUCCESS} from "../constants/product";
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

export const getProductList = () => {
    return (dispatch) => {
        dispatch({
            type: GET_PRODUCT_LIST_REQUEST
        })
        productsAPI.getProductList()
            .then(result => {
                dispatch({
                    type: GET_PRODUCT_LIST_SUCCESS,
                    payload: { data: result.data }
                })
            })
            .catch(
                error => {
                    dispatch({
                        type: GET_PRODUCT_LIST_FAIL,
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