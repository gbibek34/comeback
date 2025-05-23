import "./App.css";
import LoginPage from "./User/pages/LoginPage";
import RegisterPage from "./User/pages/RegisterPage";
import AddressPage from "./User/pages/AddressPage";
import ProfilePage from "./User/pages/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
