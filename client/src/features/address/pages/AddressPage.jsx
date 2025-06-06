import React from "react";
import axios from "axios";
import AddressCard from "../components/AddressCard";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

export default function AddressPage() {
  const [formData, setFormData] = React.useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const navigate = useNavigate();

  const handle = (key) => (val) =>
    setFormData((prevForm) => ({ ...prevForm, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_URL}/address/add`,
        {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      alert("DONE!!");
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AddressCard
      street={formData.street}
      city={formData.city}
      state={formData.state}
      zip={formData.zip}
      country={formData.country}
      handle={handle}
      onSubmit={handleSubmit}
    />
  );
}
