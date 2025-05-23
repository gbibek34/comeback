import React from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";

export default function ProfilePage() {
  const [userInfoCore, setUserInfoCore] = React.useState({});
  const [userAddress, setUserAddress] = React.useState({});
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setUserInfoCore(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/address/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data[0]);
        setUserAddress(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
    fetchAddress();
  }, []);

  return (
    <div className="profile-page">
      <ProfileCard userInfoCore={userInfoCore} userAddress={userAddress} />
    </div>
  );
}
