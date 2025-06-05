import React from "react";
import InputField from "../../../components/InputField";
import { Link } from "react-router-dom";

export default function LoginCard({ email, password, handle, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <div className="login-page page">
                <div className="login-card card">
                    <h1 className="login-title title">Login</h1>

                    <div className="input-group">
                        <InputField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handle("email")}
                        />
                        <InputField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handle("password")}
                        />
                    </div>

                    <button className="login-button button">Login</button>
                    <Link to="/register">
                        <span className="create-account">Create Account? </span>
                    </Link>
                </div>
            </div>
        </form>
    );
}
