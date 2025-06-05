import React from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Save } from 'lucide-react';
import InputField from '../../../components/InputField';
import { API_URL } from "../../../config";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';


function EditProfilePage() {
    const location = useLocation()
    const navigate = useNavigate()
    const {userInfoCore, userAddress} = location.state || {}
    console.log(userInfoCore, userAddress)
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token);
    const userId = decoded._id;  

    const [formData, setFormData] = React.useState({
         firstName:userInfoCore.firstName,
         lastName:userInfoCore.lastName,
         email:userInfoCore.email,
         password:"",
         phone:userInfoCore.phone
         })
    
    const handle = (key) => (val)=>{
        return setFormData((prevFormData) => ({...prevFormData,[key]: val}))
    }


    const handleSave = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(
            `${API_URL}/user/update/${userId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert('Profile updated successfully!');
          navigate('/profile')
        } catch (error) {
          console.error("Failed to update profile:", error);
          alert('Error updating profile.');
        }
      };



    return (
        <div className="profile-card">
          <div className="edit-profile-form">
            <InputField
              label="First Name"
              type="text"
              value={formData.firstName}
              onChange={handle('firstName')}
            />
            <InputField
              label="Last Name"
              type="text"
              value={formData.lastName}
              onChange={handle('lastName')}
            />
            <InputField
              label="Email"
              type="email"
              value={formData.email}
              onChange={handle('email')}
            />
            <InputField
              label="Password"
              type="password"
              value={formData.password}
              onChange={handle('password')}
            />
            <InputField
              label="Phone Number"
              type="number"
              value={formData.phone}
              onChange={handle('phone')}
            />
          </div>


            <button className="save-btn" onClick={handleSave}>
              <Save size={14} />
              Save Profile 
            </button>
                

        </div>
      );
}

export default EditProfilePage
