import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ResetPassword from "./ResetPassword";
import NewPassword from "./NewPassword";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<NewPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
