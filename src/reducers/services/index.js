// import * as yup from 'yup'
//
// export const signupUserSchema = yup.object().shape({
//     taiKhoan: yup.string().required('*Thông tin không được bỏ trống!'),
//     matKhau: yup.string().required('*Thông tin không được bỏ trống!'),
//     hoTen: yup.string().required('*Thông tin không được bỏ trống!'),
//     email: yup.string().required('*Thông tin không được bỏ trống!').email('*Email không phù hợp'),
//     soDt: yup.string().matches(/^[0-9]+$/, "*Số điện thoại không phù hợp").required('*Thông tin không được bỏ trống'),
//     maNhom: yup.string().required('*Thông tin không được bỏ trống!'),
// })
//
// export const signinUserSchema = yup.object().shape({
//     taiKhoan: yup.string().required('*Thông tin không được bỏ trống!'),
//     matKhau: yup.string().required('*Thông tin không được bỏ trống!'),
// })
//
// export const addMovieShowtimeSchema = yup.object().shape({
//     maPhim: yup.string().required('*Thông tin không được bỏ trống!'),
//     ngayChieuGioChieu: yup.string().required('*Thông tin không được bỏ trống!'),
//     maRap: yup.string().matches(/^[0-9]+$/, "*Mã rạp không phù hợp").required('*Thông tin không được bỏ trống'),
//     giaVe: yup.string().matches(/^[0-9]+$/, "*Giá vé không phù hợp").required('*Thông tin không được bỏ trống'),
// })
//
// export const addUserSchema = yup.object().shape({
//     taiKhoan: yup.string().required('*Thông tin không được bỏ trống!'),
//     matKhau: yup.string().required('*Thông tin không được bỏ trống!'),
//     hoTen: yup.string().required('*Thông tin không được bỏ trống!'),
//     email: yup.string().required('*Thông tin không được bỏ trống!').email('*Email không phù hợp'),
//     soDt: yup.string().matches(/^[0-9]+$/, "*Số điện thoại không phù hợp").required('*Thông tin không được bỏ trống'),
//     maNhom: yup.string().required('*Thông tin không được bỏ trống!'),
//     maLoaiNguoiDung: yup.string().required('*Thông tin không được bỏ trống!'),
// })
