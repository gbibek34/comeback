import React from "react";
import axios from "axios";
import RegisterCard from "../components/RegisterCard";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

export default function RegisterPage() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handle = (key) => (val) =>
    setFormData((prevForm) => ({ ...prevForm, [key]: val }));



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/user/signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone,
        }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.data.token);
      alert("Registration Successful");
      navigate("/address");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RegisterCard
      firstName={formData.firstName}
      lastName={formData.lastName}
      email={formData.email}
      password={formData.password}
      confirmPassword={formData.confirmPassword}
      phone={formData.phone}
      handle={handle}
      onSubmit={handleSubmit}
    />
  );
}
