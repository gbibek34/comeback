import "./App.css";
import LoginPage from "./features/user/pages/LoginPage";
import RegisterPage from "./features/user/pages/RegisterPage";
import AddressPage from "./features/address/pages/AddressPage";
import ProfilePage from "./features/user/pages/ProfilePage";
import EditProfilePage from "./features/user/pages/EditProfilePage";
import EditAddressPage from "./features/address/pages/EditAddressPage";
import AllProductsPage from "./features/products/pages/AllProductsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/address" element={<AddressPage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editProfile" element={<EditProfilePage />} />
        <Route path="/editAddress" element={<EditAddressPage />} />
        <Route path="/products" element={<AllProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
