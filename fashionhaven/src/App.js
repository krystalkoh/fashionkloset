import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Marketplace from "./components/Marketplace";
import Upload from "./components/Upload";
import NavBar from "./components/NavBar";
import MyUploads from "./components/MyUploads";
import MyCart from "./components/MyCart";
import MyOrders from "./components/MyOrders";
// import Profile from "./components/Profile";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Kloset from "./pages/Kloset";
import Cart from "./pages/Cart";
import User from "./pages/User";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/welcome" />}></Route>
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kloset" element={<Kloset />} />
        <Route path="/profile" element={<User />} />

        <Route path="/upload" element={<Upload />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<MyOrders />} />
      </Routes>
    </div>
  );
}

export default App;
