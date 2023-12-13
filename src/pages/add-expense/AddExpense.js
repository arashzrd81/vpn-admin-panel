import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import SideBar from "../../components/side-bar/SideBar";
import { showToast } from "../../helper/showToast";
import "./AddExpense.css";


const AddExpense = () => {

    const titleRef = useRef();
    const priceRef = useRef();
    const dateRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        const newExpenseData = {
            value: titleRef.current.value,
            price: priceRef.current.value,
            date: dateRef.current.value
        };
        if (!newExpenseData.value || !newExpenseData.price || !newExpenseData.date) {
            showToast("error", "!لطفا همه‌ی فیلدها رو پر کنید");
        } else {
            axios
                .post("/expenses/outcome/create",
                    {
                        ...newExpenseData
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then(() => {
                    navigate("/dashboard");
                    showToast("success", "هزینه با موفقیت ثبت شد");
                })
                .catch(() => {
                    showToast("error", "!خطای غیر منتظره‌ای رخ داد");
                });
        }
    }

    return (
        <>
            <SideBar />
            <main className="add-sec-container add-expense-container">
                <form onSubmit={handleSubmit}>
                    <h1>اضافه کردن هزینه‌ی جدید</h1>
                    <input ref={titleRef} type="text" placeholder="عنوان هزینه" />
                    <input ref={priceRef} type="number" placeholder="مبلغ" />
                    <input ref={dateRef} type="date" placeholder="تاریخ میلادی" />
                    <button type="submit">ثبت</button>
                </form>
            </main>
        </>
    );
};


export default AddExpense;