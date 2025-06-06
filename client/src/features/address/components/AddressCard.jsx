import React from "react";
import InputField from "../../../components/InputField";

export default function AddressCard({street, city, state, zip, country,handle, onSubmit }){
    return(
        <form onSubmit={onSubmit}>
        <div className="address-page page">
            <div className="address-card card">
                <h1 className="address-title title">Address</h1>
    
                <div className="input-group">


                    <InputField
                        label="Street"
                        value={street}
                        onChange={handle("street")}
                    />


                    <InputField
                        label="City"
                        value={city}
                        onChange={handle("city")}
                    />

                    <InputField
                        label="State"
                        value={state}
                        onChange={handle("state")}
                    />

                    <InputField
                        label="zip"
                        type="number"
                        value={zip}
                        onChange={handle("zip")}
                    />


                    <InputField
                        label="Country"
                        value={country}
                        onChange={handle("country")}
                    />

                    
                    
                </div>
    
                <button className="address-button button">Add Address</button>
            </div>
        </div>
        
    </form>

    )







}