import usersAPI from "../../api/usersAPI";
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    GET_USER_LIST_REQUEST,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    GET_USER_DETAIL_REQUEST,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL,
    CHANGE_STATUS_USER_FAIL,
    CHANGE_STATUS_USER_REQUEST,
    CHANGE_STATUS_USER_SUCCESS,
    GET_USER_ROLE_LIST_REQUEST,
    GET_USER_ROLE_LIST_FAIL,
    GET_USER_ROLE_LIST_SUCCESS,
    RESET_USER_DETAIL,
} from "../constants/user";
import { Axios as axios } from "axios";
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
//                         payload: { error: error.message }
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
//                         payload: { error: error.message }
//                     })
//                 }
//             )
//     }
// }

export const getUsersList = () => {
    return (dispatch) => {
        dispatch({
            type: GET_USER_LIST_REQUEST,
        });
        usersAPI
            .getUserList()
            .then((result) => {
                dispatch({
                    type: GET_USER_LIST_SUCCESS,
                    payload: { data: result.data },
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_USER_LIST_FAIL,
                    payload: { error: error.response.data.message },
                });
            });
    };
};

export const getUserRoleList = () => {
    return (dispatch) => {
        dispatch({
            type: GET_USER_ROLE_LIST_REQUEST,
        });
        usersAPI
            .getUserRoleList()
            .then((result) => {
                dispatch({
                    type: GET_USER_ROLE_LIST_SUCCESS,
                    payload: { data: result.data },
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_USER_ROLE_LIST_FAIL,
                    payload: { error: error.response.data.message },
                });
            });
    };
};

export const getUserDetail = (userId) => {
    return (dispatch) => {
        dispatch({
            type: GET_USER_DETAIL_REQUEST,
        });
        usersAPI
            .getUserDetail(userId)
            .then((result) => {
                dispatch({
                    type: GET_USER_DETAIL_SUCCESS,
                    payload: { data: result.data },
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_USER_DETAIL_FAIL,
                    payload: { error: error.response.data.message },
                });
            });
    };
};

export const changeStatusUser = (arrUserId) => {
    const configData = { list: arrUserId };
    return (dispatch) => {
        dispatch({
            type: CHANGE_STATUS_USER_REQUEST,
        });
        usersAPI
            .postChangeStatusUser(configData)
            .then((result) => {
                dispatch({
                    type: CHANGE_STATUS_USER_SUCCESS,
                    payload: {
                        data: result.data,
                        arrUserId: arrUserId,
                    },
                });
            })
            .catch((error) => {
                dispatch({
                    type: CHANGE_STATUS_USER_FAIL,
                    payload: { error: error.response.data.message },
                });
            });
    };
};

export const resetUserDetail = () => {
    return {
        type: RESET_USER_DETAIL,
    };
};

export const updateUser = (formData) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_USER_REQUEST,
        });
        usersAPI
            .postUpdateUser(formData)
            .then((result) => {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: {
                        data: result.data,
                        nameImg: formData.get("avatar").name,
                    },
                });
            })
            .catch((error) => {
                dispatch({
                    type: UPDATE_USER_FAIL,
                    payload: { error: error.response.data.message },
                });
            });
    };
};

export const addUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: ADD_USER_REQUEST,
        });
        usersAPI
            .postAddUser(user)
            .then((result) => {
                dispatch({
                    type: ADD_USER_SUCCESS,
                    payload: {
                        data: result.data,
                    },
                });
            })
            .catch((error) => {
                dispatch({
                    type: ADD_USER_FAIL,
                    payload: { error: error.response.data.message },
                });
            });
    };
};
