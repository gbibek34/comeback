import React from 'react';
import axios from "axios";
import { API_URL } from "../../../config";
import { Edit } from "lucide-react";
import { Plus } from "lucide-react";
import { Delete } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function EditAddressCard({userAddress, refreshAddresses}) {
    const addresses = Array.isArray(userAddress) ? userAddress : [];
    const navigate = useNavigate();
    const handleAddressEdit = (address) => {
        navigate('/editAddress', {
          state: { userAddress: address }
        });
      };



    const handleDelete = async(address) =>{
    const token = localStorage.getItem("token");
    try{
        const response = await axios.delete(`${API_URL}/address/delete/${address._id}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
        })
        console.log(response.data)
        refreshAddresses();

        

    }catch(err){
        console.error(err)
    }
    }
    
    return (
        <div>
            {addresses.map((address) => (
            <div className="display-address" key={address._id}>
            <p><strong>Street:</strong> {address.street}</p>
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>State:</strong> {address.state}</p>
            <p><strong>Zip:</strong> {address.zip}</p>
            <p><strong>Country:</strong> {address.country}</p>
            <div className="button-grp">
            <button 
                className="edit-btn" 
                onClick={() => handleAddressEdit(address)}
            >
                <Edit size={14}/>
                Edit Address
            </button>

            <button
                className="delete-btn"
                onClick={()=>handleDelete(address)}
            >
                <Delete size={14}/>
                Delete Address
            </button>
            </div>

            </div>
        ))}

        <button className="add-address-btn" onClick={()=>navigate('/address')}>
            <Plus size={14}/>
            Add address
        </button>
        
        </div>
    )
}

export default EditAddressCard
