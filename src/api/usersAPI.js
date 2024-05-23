import axiosClient from "./axiosClient";
import {Axios as axios} from "axios";

const usersAPI = {
    //post user:object gồm taiKhoan, matKhau, email,...
    // postDangKy: (user) => {
    //     const path = "/QuanLyNguoiDung/DangKy";
    //     return axiosClient.post(path, user);
    // },
    //
    // //post user:object taiKhoan, matKhau => nhận về data có accessToken
    // postDangNhap: (user) => {
    //     const path = "/QuanLyNguoiDung/DangNhap";
    //     return axiosClient.post(path, user);
    // },

    getUserList: () => {
        const path = "/user/find-all-user";
        return axiosClient.get(path);
    },
    getUserRoleList: () => {
        const path = "/role/get-all-role";
        return axiosClient.get(path);
    },

    postAddUser: (formData) => {
        const path = "/user/add-new-user";
        return axiosClient.post(path, formData, {headers: {
                "Content-Type": 'multipart/form-data',
            }});
    },

    postChangeStatusUser: (arrUserId) => {
        const path = "/user/change-status-user";
        return axiosClient.post(path, arrUserId);
    },

    postUpdateUser: (formData) => {
        const path = `/user/update-info-user`;
        return axiosClient.post(path, formData, {headers: {
                "Content-Type": 'multipart/form-data',
            }});
    },

    getUserDetail: (userId) => {
        const path = `/user/get-info-user/${userId}`;
        return axiosClient.get(path);
    },
};

export default usersAPI;
