import "./App.css";
import { Button } from "flowbite-react";
import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import Home from "./users/pages/Home";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import AllBooks from "./users/pages/AllBooks";
import Careers from "./users/pages/Careers";
import Contact from "./users/pages/Contact";
import Profile from "./users/pages/Profile";
import ViewBook from "./users/pages/ViewBook";
import Pnf from "./pages/PageNotFound";
import AdminBooks from "./admin/pages/AdminBooks";
import AdminHome from "./admin/pages/AdminHome";
import AdminCareers from "./admin/pages/AdminCareers";
import AdminSettings from "./admin/pages/AdminSettings";
import PaymentSuccess from "./users/pages/PaymentSuccess";
import PaymentError from "./users/pages/PaymentError";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 3000);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={isLoading ? <Home /> : <Preloader />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/viewBook/:id" element={<ViewBook />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-careers" element={<AdminCareers />} />

        <Route path="/admin-books" element={<AdminBooks />} />

        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-error" element={<PaymentError />} />

        <Route path="*" element={<Pnf />} />
      </Routes>
    </>
  );
}

export default App;
