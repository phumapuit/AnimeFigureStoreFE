import axiosClient from "./axiosClient";

const productsAPI = {

    getProductList: () => {
        const path = "/product/find-all-product";
        return axiosClient.get(path);
    },


    postAddProduct: (formData) => {
        const path = "/product/add-new-product";
        return axiosClient.post(path, formData, {headers: {
                "Content-Type": 'multipart/form-data',
            }});
    },

    postChangeStatusProduct: (arrProductId) => {
        const path = "/product/change-status-products";
        return axiosClient.post(path, arrProductId);
    },

    postUpdateProduct: (formData) => {
        const path = `/product/update-info-product`;
        return axiosClient.post(path, formData, {headers: {
                "Content-Type": 'multipart/form-data',
            }});
    },

    getProductDetail: (productId) => {
        const path = `/product/get-info-product/${productId}`;
        return axiosClient.get(path);
    },
};

export default productsAPI;
