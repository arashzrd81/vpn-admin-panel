import React, { useState, useRef } from "react";
import axios from "../../api/axios";
import Field from "../field/Field";
import { showToast } from "../../helper/showToast";
import "./Item.css";


const Item = ({type, data, toggle, setToggle}) => {

    const [paymentStatus, setPaymentStatus] = useState(data.paymentStatus);
    const [showDetails, setShowDetails] = useState(false);

    const theContainerRef = useRef();

    const handleDelete = () => {
        axios
            .delete(`/expenses/${type === "income" ? "income" : "outcome"}/delete/${data.id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                    }
                }
            )
            .then(() => {
                setToggle(!toggle);
                theContainerRef.current.style.display = "none";
            })
            .catch(() => {
                showToast("error", "!خطای غیر منتظره‌ای رخ داد");
            })
    };

    const handleUpdate = () => {
        axios
            .put(`/expenses/income/update/${data.id}`,
                {
                    ...data,
                    paymentStatus: true
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(() => {
                setPaymentStatus(true);
                setToggle(!toggle);
            })
            .catch(() => {
                showToast("error", "!خطای غیر منتظره‌ای رخ داد");
            })
    };

    return (
        <div ref={theContainerRef} className="item-container">
            <div className="item-wrapper">
                <div className="header" onClick={() => setShowDetails(!showDetails)}>
                    {
                        type === "income" ?
                        <Field icon="fa-solid fa-user" title={data.name} /> :
                        <Field icon="fa-solid fa-thumbtack" title={data.value} />
                    }
                    {
                        showDetails ?
                        <i className="fa-solid fa-chevron-up"></i> :
                        <i className="fa-solid fa-chevron-down"></i>
                    }
                </div>
                {
                    showDetails &&
                    <div className="details">
                        {
                            type === "income" ?
                            <>
                                <Field icon="fa-solid fa-stopwatch" title={`${data.monthly} ماهه`} />
                                <Field icon="fa-solid fa-users" title={`${data.howManyUser} کاربره`} />
                                <Field icon="fa-solid fa-tag" title={`${Number(data.price).toLocaleString()} تومان`} />
                                <Field icon="fa-regular fa-calendar-days" title={data.date.slice(0, 10).split("-").reverse().join("/")} />
                                {
                                    paymentStatus ?
                                    <Field icon="fa-solid fa-check" title="پرداخت شده" /> :
                                    <div className="unpaid">
                                        <Field icon="fa-solid fa-xmark" title="پرداخت نشده" />
                                        <button onClick={handleUpdate}>پرداخت کرد</button>
                                    </div>
                                }
                            </> :
                            <>
                                <Field icon="fa-solid fa-tag" title={`${Number(data.price).toLocaleString()} تومان`} />
                                <Field icon="fa-regular fa-calendar-days" title={data.date.slice(0, 10).split("-").reverse().join("/")} />
                            </>
                        }
                    </div>
                }
            </div>
            <div className="delete-item-wrapper" onClick={handleDelete}>
                <i className="fa-solid fa-trash-can"></i>
            </div>
        </div>
    );
};


export default Item;