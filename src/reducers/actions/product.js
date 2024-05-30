import productsAPI from "../../api/productsAPI";
import {
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    CHANGE_STATUS_PRODUCT_FAIL,
    CHANGE_STATUS_PRODUCT_REQUEST,
    CHANGE_STATUS_PRODUCT_SUCCESS,
    GET_PRODUCT_DETAIL_FAIL,
    GET_PRODUCT_DETAIL_REQUEST,
    GET_PRODUCT_DETAIL_SUCCESS,
    GET_PRODUCT_LIST_FAIL,
    GET_PRODUCT_LIST_REQUEST,
    GET_PRODUCT_LIST_SUCCESS,
    RESET_PRODUCT_DETAIL,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
} from "../constants/product";

export const getProductList = () => {
    return (dispatch) => {
        dispatch({
            type: GET_PRODUCT_LIST_REQUEST,
        });
        productsAPI
            .getProductList()
            .then((result) => {
                dispatch({
                    type: GET_PRODUCT_LIST_SUCCESS,
                    payload: { data: result.data },
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_PRODUCT_LIST_FAIL,
                    payload: { error: error.response?.data },
                });
            });
    };
};

export const getProductDetail = (productId) => {
    return (dispatch) => {
        dispatch({
            type: GET_PRODUCT_DETAIL_REQUEST,
        });
        productsAPI
            .getProductDetail(productId)
            .then((result) => {
                dispatch({
                    type: GET_PRODUCT_DETAIL_SUCCESS,
                    payload: { data: result.data },
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_PRODUCT_DETAIL_FAIL,
                    payload: { error: error.response.data.message },
                });
            });
    };
};

export const changeStatusProduct = (arrProductId) => {
    const configData = { list: arrProductId };
    return (dispatch) => {
        dispatch({
            type: CHANGE_STATUS_PRODUCT_REQUEST,
        });
        productsAPI
            .postChangeStatusProduct(configData)
            .then((result) => {
                dispatch({
                    type: CHANGE_STATUS_PRODUCT_SUCCESS,
                    payload: {
                        data: result.data,
                        arrProductId: arrProductId,
                    },
                });
            })
            .catch((error) => {
                dispatch({
                    type: CHANGE_STATUS_PRODUCT_FAIL,
                    payload: { error: error.response.data.message },
                });
            });
    };
};

export const resetProductDetail = () => {
    return {
        type: RESET_PRODUCT_DETAIL,
    };
};

export const updateProduct = (formData, handleValue) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST,
        });
        productsAPI
            .postUpdateProduct(formData)
            .then((result) => {
                dispatch({
                    type: UPDATE_PRODUCT_SUCCESS,
                    payload: {
                        data: result.data,
                        value: handleValue,
                        nameImg: formData.get("avatar").name,
                    },
                });
            })
            .catch((error) => {
                dispatch({
                    type: UPDATE_PRODUCT_FAIL,
                    payload: { error: error.response.data.message },
                });
            });
    };
};

export const addProduct = (formData, handleValue) => {
    return (dispatch) => {
        dispatch({
            type: ADD_PRODUCT_REQUEST,
        });
        productsAPI
            .postAddProduct(formData)
            .then((result) => {
                dispatch({
                    type: ADD_PRODUCT_SUCCESS,
                    payload: {
                        data: result.data,
                        value: handleValue,
                        nameImg: formData.get("avatar").name
                    },
                });
            })
            .catch((error) => {
                dispatch({
                    type: ADD_PRODUCT_FAIL,
                    payload: { error: error.response.data.message },
                });
            });
    };
};
