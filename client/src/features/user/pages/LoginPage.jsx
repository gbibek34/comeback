import React from "react";
import axios from "axios";
import LoginCard from "../components/LoginCard";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config"

export default function LoginPage() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handle = (key) => (val) =>
    setFormData((prevForm) => ({ ...prevForm, [key]: val }));

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/user/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      alert("Login Successful !!!");
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginCard
      email={formData.email}
      password={formData.password}
      handle={handle}
      onSubmit={handleSubmit}
    />
  );
}
