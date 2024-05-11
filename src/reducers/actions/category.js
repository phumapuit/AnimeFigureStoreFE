// import moviesApi from '../../api/moviesApi';
// import { GET_MOVIE_LIST_REQUEST, GET_MOVIE_LIST_SUCCESS, GET_MOVIE_LIST_FAIL, DELETE_MOVIE_REQUEST, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_FAIL, UPDATE_MOVIE_REQUEST, UPDATE_MOVIE_FAIL, ADD_MOVIE_REQUEST, ADD_MOVIE_SUCCESS, ADD_MOVIE_FAIL } from '../constants/Movie';
// import { UPDATE_USER_SUCCESS } from '../constants/User';
//
export const getCategoryList = () => {
    return(
        <>TEST</>
    )
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