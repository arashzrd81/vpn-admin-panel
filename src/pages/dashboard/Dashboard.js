import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import SideBar from "../../components/side-bar/SideBar";
import Item from "../../components/item/Item";
import { showToast } from "../../helper/showToast";
import "./Dashboard.css";


const Dashboard = () => {

    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, [toggle]);

    const getIncomes = () => {
        axios
            .get("/expenses/income/get",
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                    }
                }
            )
            .then(response => {
                const sortedIncomes = response.data.data.sort(
                    (a, b) => Date.parse(a.date) - Date.parse(b.date)
                );
                setIncomes(sortedIncomes.reverse());
            })
            .catch(() => {
                showToast("error", "!خطای غیرمنتظره‌ای رخ داد");
            });
    };

    const getExpenses = () => {
        axios
            .get("/expenses/outcome/get",
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                    }
                }
            )
            .then(response => {
                const sortedExpenses = response.data.data.sort(
                    (a, b) => Date.parse(a.date) - Date.parse(b.date)
                );
                setExpenses(sortedExpenses.reverse());
            })
            .catch(() => {
                showToast("error", "!خطای غیرمنتظره‌ای رخ داد");
            });
    };

    const calculateIncomes = () => (
        incomes.reduce((acc, income) => income.paymentStatus ? acc + Number(income.price) : acc, 0)
    );

    const calculateExpenses = () => (
        expenses.reduce((acc, expense) => acc + Number(expense.price), 0)
    );

    const calculateProfit = () => {
        const profit = calculateIncomes(incomes) - calculateExpenses(expenses);
        if (Number(profit) < 0) {
            return `${Math.abs(profit).toLocaleString()}-`;
        }
        return profit.toLocaleString();
    };

    return (
        <>
            <SideBar />
            <main className="dashboard-container">
                <div className="statistics-wrapper">
                    <div className="statistic">
                        <span>تعداد کاربران:</span>
                        <span>{incomes.length} کاربر</span>
                    </div>
                    <div className="statistic">
                        <span>مجموع درآمد:</span>
                        <span>{calculateIncomes().toLocaleString()} تومان</span>
                    </div>
                    <div className="statistic">
                        <span>مجموع هزینه:</span>
                        <span>{calculateExpenses().toLocaleString()} تومان</span>
                    </div>
                    <div className="statistic">
                        <span>سود خالص:</span>
                        <span>{calculateProfit()} تومان</span>
                    </div>
                </div>
                <div className="items-wrapper">
                    <div className="incomes-wrapper">
                        <h1>درآمدها</h1>
                        {
                            incomes.map(income => (
                                <Item
                                    key={income.id}
                                    type="income"
                                    data={income}
                                    toggle={toggle}
                                    setToggle={setToggle}
                                />
                            ))
                        }
                    </div>
                    <div className="expenses-wrapper">
                        <h1>هزینه‌ها</h1>
                        {
                            expenses.map(expense => (
                                <Item
                                    key={expense.id}
                                    type="expense"
                                    data={expense}
                                    toggle={toggle}
                                    setToggle={setToggle}
                                />
                            ))
                        }
                    </div>
                </div>
            </main>
        </>
    );
};


export default Dashboard;