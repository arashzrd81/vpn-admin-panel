import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { showToast } from "../../helper/showToast";
import "./Login.css";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        if (!username || !password) {
            showToast("error", "!لطفا همه‌ی فیلدها رو پر کنید");
        } else {
            axios
                .post("/user/login",
                    {
                        username: username,
                        password: password
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then(response => {
                    localStorage.setItem("isAuth", "true");
                    localStorage.setItem("adminToken", response.data.access_token);
                    navigate("/dashboard", {
                        replace: true
                    });
                    showToast("success", "شما با موفقیت وارد شدید");
                })
                .catch(response => {
                    if (response.response.data.statusCode === 401) {
                        showToast("error", "!نام کاربری یا رمز عبور نادرست است")
                    } else {
                        showToast("error", "!خطای غیر منتظره‌ای رخ داد");
                    }
                });
        }
    };

    return (
        <main className="login-container">
            <section className="login-wrapper">
                <h1>پنل کاربری ادمین</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="نام کاربری"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="رمز عبور"
                    />
                    <button type="submit">ورود</button>
                </form>
            </section>
        </main>
    );
};


export default Login;