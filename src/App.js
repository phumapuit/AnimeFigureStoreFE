import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebLayout from "./layouts/web";
import AdminLayout from "./layouts/admin";
import HomePage from "./pages/web/HomePage";
import Cart from "./pages/web/Cart";
import Account from "./pages/web/Account";
import ProductDetail from "./pages/web/ProductDetail";
import Login from "./pages/web/Login";
import Register from "./pages/web/Register";
import Category from "./pages/admin/Category";
import Order from "./pages/admin/Order";
import Product from "./pages/admin/Product";
import User from "./pages/admin/User";
import ErrorPage from "./components/web/error";
import Profile from "./pages/admin/Profile";
import Dashboard from "./pages/admin/Dashboard";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
    useEffect(() => {
        document.title = "TP-STORE";
    });
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WebLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="product/:productName" element={<ProductDetail />} />
                    <Route path="account" element={<Account />} />
                    <Route path="cart" element={<Cart />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index path="users" element={<User />} />
                    <Route path="products" element={<Product />} />
                    <Route path="categories" element={<Category />} />
                    <Route path="orders" element={<Order />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default App;
