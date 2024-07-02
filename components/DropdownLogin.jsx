// components/DropdownLogin.jsx
"use client";

import React from "react";

export default function DropdownLogin() {
    return (
        <div className="dropdown dropdown-end">
            <button className="btn btn-circle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
                <li>
                    <a>Login</a>
                </li>
                <li>
                    <a>Settings</a>
                </li>
                <li>
                    <a>Logout</a>
                </li>
            </ul>
        </div>
    );
}
