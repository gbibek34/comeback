import React from "react";
import InputField from "./InputField";

export default function RegisterCard({firstName = "", lastName = "", email, password, confirmPassword = "", phone = "",handle, onSubmit}){
    return(
        <form onSubmit={onSubmit}>
        <div className="register-page page">
            <div className="register-card card">
                <h1 className="register-title title">Register</h1>
    
                <div className="input-group">


                    <InputField
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={handle("firstName")}
                    />


                    <InputField
                        label="Last Name"
                        type="text"
                        value={lastName}
                        onChange={handle("lastName")}
                    />


            

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


                    <InputField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handle("confirmPassword")}
                    />

                    
                    <InputField
                        label="phone"
                        type="number"
                        value={phone}
                        onChange={handle("phone")}
                    />
                    
                    
                </div>
    
                <button className="register-button button">Next</button>
            </div>
        </div>
        
    </form>

    )




}