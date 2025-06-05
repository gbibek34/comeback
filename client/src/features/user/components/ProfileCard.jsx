import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";
import EditAddressCard from "../../address/components/EditAddressCard";
import { Edit } from "lucide-react";
import { Delete } from "lucide-react";


export default function ProfileCard({ userInfoCore, userAddress, refreshAddresses}) {
  const navigate = useNavigate();

  const handleProfileEdit = () => {
    navigate('/editProfile', {
      state: { userInfoCore }
    });
  };
  const token = localStorage.getItem("token")
  const addresses = Array.isArray(userAddress) ? userAddress : [];

  

  const handleProfileDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete the profile?");
    if (!confirmed) return;
  
    try {
      // Delete user profile
      await axios.delete(`${API_URL}/user/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Delete all associated addresses
      await Promise.all(
        addresses.map(address =>
          axios.delete(`${API_URL}/address/delete/${address._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      navigate('/')
    } catch (err) {
      console.error("Delete failed", err);
    }
  };
  
  

  return (
    <div className="profile-card">
      <p><strong>First Name:</strong> {userInfoCore.firstName}</p>
      <p><strong>Last Name:</strong> {userInfoCore.lastName}</p>
      <p><strong>Email:</strong> {userInfoCore.email}</p>
      <div className="button-grp">
        <button className="edit-btn" onClick={handleProfileEdit}>
          <Edit size={14} />
          Edit Profile
        </button>
        <button className="delete-btn" onClick={handleProfileDelete}>
          <Delete size={14}/>
          Delete Profile
        </button>

      </div>



      <EditAddressCard userAddress={userAddress} refreshAddresses={refreshAddresses}/>
      
    </div>
  )
}
