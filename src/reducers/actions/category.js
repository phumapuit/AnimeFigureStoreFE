import {GET_PRODUCT_LIST_FAIL, GET_PRODUCT_LIST_REQUEST, GET_PRODUCT_LIST_SUCCESS} from "../constants/product";
import {GET_CATEGORY_LIST_FAIL, GET_CATEGORY_LIST_REQUEST, GET_CATEGORY_LIST_SUCCESS} from "../constants/category";
import categoriesAPI from "../../api/categoriesAPI";

export const getCategoryList = () => {
    return (dispatch) => {
        dispatch({
            type: GET_CATEGORY_LIST_REQUEST
        })
        categoriesAPI.getCategoriesList()
            .then(result => {
                dispatch({
                    type: GET_CATEGORY_LIST_SUCCESS,
                    payload: { data: result.data }
                })
            })
            .catch(
                error => {
                    dispatch({
                        type: GET_CATEGORY_LIST_FAIL,
                        payload: { error: error.response.data.message, }
                    })
                }
            )
    }
    // return (dispatch) => {
    //     dispatch({
    //         type: GET_MOVIE_LIST_REQUEST
    //     })
    //     moviesApi.getDanhSachPhim()
    //         .then(result => {
    //                 dispatch({
    //                     type: GET_MOVIE_LIST_SUCCESS,
    //                     payload: { data: result.data }
    //                 })
    //             }
    //         )
    //         .catch(
    //             error => {
    //                 dispatch({
    //                     type: GET_MOVIE_LIST_FAIL,
    //                     payload: { error: error.response.data, }
    //                 })
    //             }
    //         )
    // }
}
//
// export const deleteMovie = (movieId) => {
//     return (dispatch) => {
//         dispatch({
//             type: DELETE_MOVIE_REQUEST
//         })
//         moviesApi.deleteMovie(movieId)
//             .then(result => {
//                 dispatch({
//                     type: DELETE_MOVIE_SUCCESS,
//                     payload: { data: result.data }
//                 }, dispatch(getMovieList()))
//             })
//             .catch(
//                 error => {
//                     dispatch({
//                         type: DELETE_MOVIE_FAIL,
//                         payload: { error: error.response.data }
//                     })
//                 }
//             )
//     }
// }
//
// export const updateMovie = (movie) => {
//     return (dispatch) => {
//         dispatch({
//             type: UPDATE_MOVIE_REQUEST
//         })
//         moviesApi.postCapNhatPhim(movie)
//             .then(result => {
//                 dispatch({
//                     type: UPDATE_USER_SUCCESS,
//                     payload: { data: result.data }
//                 }, dispatch(getMovieList()))
//             })
//             .catch(
//                 error => {
//                     dispatch({
//                         type: UPDATE_MOVIE_FAIL,
//                         payload: { error: error.response.data }
//                     })
//                 }
//             )
//     }
// }
//
// export const addMovie = (movie) => {
//     return (dispatch) => {
//         dispatch({
//             type: ADD_MOVIE_REQUEST
//         })
//         moviesApi.postThemPhim(movie)
//             .then(result => {
//                 dispatch({
//                     type: ADD_MOVIE_SUCCESS,
//                     payload: { data: result.data }
//                 }, dispatch(getMovieList()))
//             })
//             .catch(
//                 error => {
//                     dispatch({
//                         type: ADD_MOVIE_FAIL,
//                         payload: { error: error.response.data }
//                     })
//                 }
//             )
//     }
// }