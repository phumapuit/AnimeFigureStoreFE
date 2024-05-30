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
} from "./constants/product";

const initialProductState = {
    productList: [],
    productDetail: null,

    loading: false,
    loadingAddProduct: false,
    loadingUpdateProduct: false,

    error: null,
    errorAddProduct: null,
    errorUpdateProduct: null,
    errorChangeStatusProduct: null,
};

const productReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case GET_PRODUCT_LIST_REQUEST: {
            return { ...state, loading: true, error: null };
        }
        case GET_PRODUCT_LIST_SUCCESS: {
            return {
                ...state,
                productList: action.payload.data.data,
                loading: false,
                error: null,
            };
        }
        case GET_PRODUCT_LIST_FAIL: {
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };
        }
        case GET_PRODUCT_DETAIL_REQUEST: {
            return { ...state };
        }
        case GET_PRODUCT_DETAIL_SUCCESS: {
            return {
                ...state,
                productDetail: action.payload.data.data,
            };
        }
        case GET_PRODUCT_DETAIL_FAIL: {
            return {
                ...state,
                error: action.payload.error,
            };
        }
        case RESET_PRODUCT_DETAIL: {
            return {
                ...state,
                productDetail: null,
            };
        }
        //
        case CHANGE_STATUS_PRODUCT_REQUEST: {
            return {
                ...state,
                errorChangeStatusProduct: null,
            };
        }
        case CHANGE_STATUS_PRODUCT_SUCCESS: {
            const { arrProductId } = action.payload;
            return {
                ...state,
                productList: state.productList.map((product) => (arrProductId.includes(product["productId"]) ? { ...product, deleted: !product["deleted"] } : product)),
                errorChangeStatusProduct: null,
            };
        }
        case CHANGE_STATUS_PRODUCT_FAIL: {
            return {
                ...state,
                errorChangeStatusProduct: action.payload.error,
            };
        }

        case UPDATE_PRODUCT_REQUEST: {
            return {
                ...state,
                loadingUpdateProduct: true,
                errorUpdateProduct: null,
            };
        }
        case UPDATE_PRODUCT_SUCCESS: {
            const value = action.payload.value;
            const nameImg = action.payload.nameImg;
            const handleValue = {...value,
                images : `/product-photos/${value["productId"]}/${nameImg}`,
            };
            return {
                ...state,
                productList: state.productList.map((product) => (product["productId"] === handleValue["productId"]) ? handleValue : product),
                loadingUpdateProduct: false,
            };
        }
        case UPDATE_PRODUCT_FAIL: {
            return {
                ...state,
                loadingUpdateProduct: false,
                errorUpdateProduct: action.payload.error,
            };
        }

        case ADD_PRODUCT_REQUEST: {
            return {
                ...state,
                loadingAddProduct: true,
                errorAddProduct: null,
            };
        }
        case ADD_PRODUCT_SUCCESS: {
            const userId = action.payload?.data?.data.userId;
            const value = action.payload.value;
            const nameImg = action.payload.nameImg
            console.log(value)
            const handleData = {...value,
                images : userId!== undefined ?`/product-photos/${userId}/${nameImg}`:`/user-photos/default_avatar.jpg`,
            };
            return {
                ...state,
                productList: [...state.productList, handleData],
                errorAddProduct: null,
                loadingAddProduct: false,
            };
        }
        case ADD_PRODUCT_FAIL: {
            return {
                ...state,
                loadingAddProduct: false,
                errorAddProduct: action.payload.error,
            };
        }
        default:
            return state;
    }
};
export default productReducer;
