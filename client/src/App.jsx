import "./App.css";
import LoginPage from "./features/user/pages/LoginPage" ;
import RegisterPage from "./features/user/pages/RegisterPage";
import AddressPage from "./features/user/pages/AddressPage";
import ProfilePage from "./features/user/pages/ProfilePage";
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
