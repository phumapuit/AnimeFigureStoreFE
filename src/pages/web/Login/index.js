import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryList } from '../../../reducers/actions/category';

import LoadingPage from '../../../components/loading';
import ErrorPage from '../../../components/error';
import { useNavigate  } from 'react-router';

export default function Login() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoryList())
    }, [])

    // useEffect(() => {
    //     document.getElementById(navigate.location.key)?.scrollIntoView(
    //         {
    //             behavior: "smooth",
    //             block: "center",
    //             inline: "center"
    //         })
    // }, [])

    useEffect(() => {
        document.title = 'TP-STORE LOGIN'
    }, [])

    // if (loading) {
    //     return <LoadingPage />
    // }
    // if (error) {
    //     return <ErrorPage />
    // }

    return (
        <div>
            <h1>THIS IS CONTENT AT LOGIN PAGE</h1>
        </div>
    )
}

