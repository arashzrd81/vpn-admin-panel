import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import SideBar from "../../components/side-bar/SideBar";
import { showToast } from "../../helper/showToast";
import "./AddIncome.css";


const AddIncome = () => {

    const nameRef = useRef();
    const monthsCountRef = useRef();
    const usersCountRef = useRef();
    const priceRef = useRef();
    const paymentStatusRef = useRef();
    const dateRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        const newConfigData = {
            name: nameRef.current.value,
            monthly: monthsCountRef.current.value,
            howManyUser: usersCountRef.current.value,
            price: priceRef.current.value,
            paymentStatus: paymentStatusRef.current.checked,
            date: dateRef.current.value
        };
        if (
            !newConfigData.name || !newConfigData.monthly ||
            !newConfigData.howManyUser || !newConfigData.price || !newConfigData.date
        ) {
            showToast("error", "!لطفا همه‌ی فیلدها رو پر کنید");
        } else {
            axios
                .post("/expenses/income/create",
                    {
                        ...newConfigData
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
                    showToast("success", "درآمد با موفقیت ثبت شد");
                })
                .catch(() => {
                    showToast("error", "!خطای غیر منتظره‌ای رخ داد");
                });
        }
    };

    return (
        <>
            <SideBar />
            <main className="add-sec-container add-income-container">
                <form onSubmit={handleSubmit}>
                    <h1>اضافه کردن درآمد جدید</h1>
                    <input ref={nameRef} type="text" placeholder="نام و نام خانوادگی" />
                    <input ref={monthsCountRef} type="number" placeholder="تعداد ماه" />
                    <input ref={usersCountRef} type="number" placeholder="تعداد کاربر" />
                    <input ref={priceRef} type="number" placeholder="مبلغ" />
                    <input ref={dateRef} type="date" placeholder="تاریخ میلادی" />
                    <div>
                        <input ref={paymentStatusRef} id="payment-status" type="checkbox" />
                        <label htmlFor="payment-status">پرداخت شده</label>
                    </div>
                    <button type="submit">ثبت</button>
                </form>
            </main>
        </>
    );
};


export default AddIncome;