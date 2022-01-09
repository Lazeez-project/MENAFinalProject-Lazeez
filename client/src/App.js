import React from "react";
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Navbar from "./end-user/components/Navbar";
import Home from "./end-user/pages/Home";
import Restaurants from "./end-user/pages/Restaurants";
import About from "./end-user/pages/About";
import Footer from "./end-user/components/Footer";
import RestaurantPage from "./end-user/pages/RestaurantPage";
import OrderTrackPage from "./end-user/pages/OrderTrackPage";
import ErrorPage from "./end-user/pages/ErrorPage";
import OwnerPath from './resturantOwner/OwnerPath';
import AdminPath from './admin/AdminPath';


const App = () => {
  const links = ['Home', 'Restaurants', 'Order', 'About', 'Contact'];
  return (
    <div>
      <BrowserRouter>

        {window.location.href.includes('resturant/owner') || window.location.href.includes('admin') ? null : <Navbar links={links} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/restaurants' element={<Restaurants />} />
          <Route path='/restaurants/:resid' element={<RestaurantPage />} />
          <Route path='/about' element={< About />} />
          {/*<Route path='/contact' element={<Contact />} />*/}
          <Route path='/track' element={<OrderTrackPage />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path="/resturant/owner/*" element={<OwnerPath />} />
          <Route path="/admin/*" element={<AdminPath />} />
        </Routes>
        {window.location.href.includes('resturant/owner') || window.location.href.includes('admin') ? null : <Footer />}
      </BrowserRouter>

    </div>
  );
}
export default App;
