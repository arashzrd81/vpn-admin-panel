import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";


const SideBar = () => {

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <aside>
            <Link to="/dashboard">
                <i className="fa-solid fa-house"></i>
            </Link>
            <Link to="/add-expense">
                <i className="fa-solid fa-money-check-dollar"></i>
            </Link>
            <Link to="/add-income">
                <i className="fa-solid fa-user-plus"></i>
            </Link>
            <i className="fa-solid fa-arrow-right-from-bracket" onClick={handleLogout}></i>
        </aside>
    );
};


export default SideBar;