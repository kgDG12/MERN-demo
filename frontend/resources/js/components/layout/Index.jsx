import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Navbar from '../layout/Navbar';

export default function Index() {
    // useEffect(() => {
    //     document.title = "Home";
    // },[]);
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}