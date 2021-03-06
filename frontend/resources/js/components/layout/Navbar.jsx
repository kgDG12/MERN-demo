import React from 'react';
import { Routes, Route, Outlet, Link, useMatch } from "react-router-dom";
import CustomLink from '../parts/CustomLink';
import env from './../../../../env.json'

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top ">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bolder fs-4" to={''} >{env.APP_NAME}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
                            <CustomLink to={''} text='Home' />
                            <CustomLink to={'example'} text='Example' />
                            {/* <CustomLink to={'infiscroll'} text='InfiScroll' /> */}
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </>
    );
}
