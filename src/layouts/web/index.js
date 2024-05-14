import React from 'react'
import Header from '../../components/web/header'
import Footer from '../../components/web/footer';
import { Outlet } from 'react-router-dom';
export default function WebLayout() {
    return (
        <>
            <Header />
            <main><Outlet /></main>
            <Footer />
        </>
    )
}

