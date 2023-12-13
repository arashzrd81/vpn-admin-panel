import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AddExpense from "./pages/add-expense/AddExpense";
import AddIncome from "./pages/add-income/AddIncome";
import "./App.css";


const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    JSON.parse(localStorage.getItem("isAuth")) ?
                    <Navigate to="/dashboard" replace /> :
                    <Login />
                } />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/add-expense" element={
                    <ProtectedRoute>
                        <AddExpense />
                    </ProtectedRoute>
                } />
                <Route path="/add-income" element={
                    <ProtectedRoute>
                        <AddIncome />
                    </ProtectedRoute>
                } />
            </Routes>
            <ToastContainer className="toast" />
        </>
    );
};


const ProtectedRoute = ({children}) => {
    if (JSON.parse(localStorage.getItem("isAuth"))) {
        return children;
    }
    return <Navigate to="/" replace />;
};


export default App;