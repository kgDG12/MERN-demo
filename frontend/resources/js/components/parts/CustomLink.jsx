import React, { Children } from 'react';
import { Routes, Route, Outlet, Link, useMatch, useResolvedPath } from "react-router-dom";

export default function CustomLink({ text, to='', ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div>
      <li className="nav-item">
        <Link
          className={match ? 'nav-link active' : 'nav-link'}
          to={to}
          {...props} >
          {text}
        </Link>
      </li>
    </div>
  );
}
