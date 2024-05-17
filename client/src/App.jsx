import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Error from "./pages/Error";
import {AdminLayout} from "./components/layouts/Admin-Layout";
import Adminusers from "./pages/Admin-Users";
import {AdminContacts} from "./pages/Admin-Contacts";
import AdminUserUpdate from "./pages/Admin-User-Update";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<Adminusers />}></Route>
            <Route path="contacts" element={<AdminContacts />}></Route>
            <Route path="users/:id/edit" element={< AdminUserUpdate/>}></Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
