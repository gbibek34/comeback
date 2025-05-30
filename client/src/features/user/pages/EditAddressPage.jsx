import React from 'react'
import axios from 'axios'

import { useLocation } from 'react-router-dom'
import InputField from '../components/InputField'
import { useNavigate } from 'react-router-dom'
import { API_URL } from "../../../config";


function EditAddressPage() {
    const location = useLocation()
   
    const userAddress = location.state || {}
    const token = localStorage.getItem('token')
    const addId = userAddress._id;
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        street:userAddress.street,
        city:userAddress.city,
        state:userAddress.state,
        zip:userAddress.zip,
        country:userAddress.country
         })
    
    const handle = (key) => (val)=>{
        return setFormData((prevFormData) => ({...prevFormData,[key]: val}))
    }
    console.log(formData)

    const handleSave = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(
            `${API_URL}/address/update/${addId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert('Address updated successfully!');
          console.log(response.data)
          navigate('/profile')

        } catch (error) {
          console.error('Failed to update address:', error);
          alert('Error updating address.');
        }
      };
  return (
    <div className="profile-card">
          <div className="edit-profile-form">
            <InputField
              label="Street"
              type="text"
              value={formData.street}
              onChange={handle('street')}
            />
            <InputField
              label="City"
              type="text"
              value={formData.city}
              onChange={handle('city')}
            />
            <InputField
              label="state"
              type="text"
              value={formData.state}
              onChange={handle('state')}
            />
            <InputField
              label="zip"
              type="number"
              value={formData.zip}
              onChange={handle('zip')}
            />
            <InputField
              label="Country"
              type="text"
              value={formData.country}
              onChange={handle('country')}
            />
            <button className="save-button" onClick={handleSave}>
                Save Address
            </button>
          </div>


                

        </div>
      );
}

export default EditAddressPage
