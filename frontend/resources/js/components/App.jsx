import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom";
import Index from "./layout/Index";
import Home from "./pages/Home";
import Example from "./test/Example";
import env from './../../../env.json';

const url = env.API_URL + ':' + env.API_PORT;

export default function App() {
    return (
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route path={''} element={<Index />}>
                        <Route path={''} element={<Home url={url} />} />
                        <Route path={'example'} element={<Example />} />
                    </Route>
                </Routes>
            </Router>
        </React.StrictMode>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}