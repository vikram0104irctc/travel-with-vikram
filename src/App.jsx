import { useContext, useEffect } from "react";
import { HomePage } from "./components/HomePagey";
import { FormData } from "./components/DataAdd";
import { Navbar } from "./components/NavBar";
import { DataContext } from "./context/Datacontext";
import {Routes, Route} from 'react-router-dom'
import axios from "axios";
import { ShowFullDetails } from "./components/DetailsPage";
import { AdminPage } from "./components/AdminPagey";
import { BookingPage } from "./components/BookinPagey";
import { LoginPage } from "./components/LoginPagey";
import { SignupPage } from "./components/SignupPagey";
import { PrivateRoute } from "./privateRoute/Adminaccess";
import { PrivateRouteB } from "./privateRoute/bookingaccess";

function App() {
  let URL = "https://sprint-1-rct-eva-default-rtdb.asia-southeast1.firebasedatabase.app";
  let {data, SetData} = useContext(DataContext)
  function fetchData() {
    axios.get(`${URL}/destinations.json`)
    .then((res) => {
      SetData(Object.entries(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(()=>{
    fetchData()
  },[]);

  return (
    <>
      <Navbar fetchData={fetchData} />
      <div className="maincontainer">
        <Routes>
          <Route path="/" element={<HomePage fetchData={fetchData} />} />
          <Route path="/dataadd" element={<FormData/>} />
          <Route path="/details" element={<ShowFullDetails/>} />
          <Route path="*" element={<HomePage fetchData={fetchData}/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/admin" element={<PrivateRoute Component={AdminPage}/>}/>
          <Route path="/booking" element={<PrivateRouteB Component={BookingPage}/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
