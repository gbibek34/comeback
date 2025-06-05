import React from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import { API_URL } from "../../../config";

export default function ProfilePage() {
  const [userInfoCore, setUserInfoCore] = React.useState({});
  const [userAddress, setUserAddress] = React.useState([]);
  const token = localStorage.getItem("token");

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${API_URL}/address/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("THIS IS FROM PROFILEPAGE:", response.data.data);
      setUserAddress(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfoCore(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
    fetchAddress();
  }, []);

  return (
    <div className="profile-page">
      <ProfileCard
        userInfoCore={userInfoCore}
        userAddress={userAddress}
        refreshAddresses={fetchAddress} 
      />
    </div>
  );
}

