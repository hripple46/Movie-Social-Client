import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
