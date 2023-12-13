import React from "react";
import "./Field.css";


const Field = ({icon, title}) => {
    return (
        <div className="field">
            <i className={icon}></i>
            <span>{title}</span>
        </div>
    );
};


export default Field;