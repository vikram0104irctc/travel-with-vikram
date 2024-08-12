import { useState, useEffect, useContext, useRef } from "react";
import { json, useNavigate } from "react-router-dom";
import { DataContext } from "../context/Datacontext";
import "./secondnav.css"
import { ThemeContext } from "../context/themecontext";
import { LoginContext } from "../context/loginContext";

export const Navbar = ({fetchData}) => {
  let {login, SetLogin} = useContext(LoginContext)
  let {data, SetData} = useContext(DataContext)
  let inputref = useRef("")
  let navigate = useNavigate()
  let {lightmode, SetLightMode} = useContext(ThemeContext);
  useEffect(() => {
    document.body.className = lightmode ? 'light-mode' : 'dark-mode';
  }, [lightmode]);

  
  function handleSearch() {
    const value = inputref.current.value;
    if (value.length >= 3) {
      const filteredData = data.filter((item) => {
        const name = item[1];
        return name && name.name.toLowerCase().includes(value.toLowerCase());
      });
      SetData(filteredData);
    } else {
      alert("Please provide at least three characters");
    }
  }

  function handleReset(){
    inputref.current.value = "";
    fetchData()
  }

  function handleFilter(e){
    if (e.target.value=="reset"){
      fetchData()
    }else{
      const filteredData = data.filter((item) => {
        const country = item[1];
        return country && country.country.toLowerCase().includes(e.target.value.toLowerCase());
      });
      SetData(filteredData);
    }
  }

  function handleBudget(e){
    if (e.target.value=="reset"){
      fetchData()
    }else{
      const filteredData = data.filter((item) => {
        const averageBudget = item[1];
        return averageBudget && averageBudget.averageBudget <= Number(e.target.value);
      });
      SetData(filteredData);
    }
  }

  function handleSort(e){
    if (e.target.value=="reset"){
      fetchData()
    }else if (e.target.value=="averageBudget"){
      const filteredData = data.sort((a,b) => {
        return a[1].averageBudget - b[1].averageBudget;
      });
      SetData(filteredData);
    }
  }

  function handleTheme(){
    SetLightMode(!lightmode)
    localStorage.setItem("themeprefrence", JSON.stringify(!lightmode))
  }

  function handleLogged(){
    if (!login){
      navigate("/login")
    }else{
      SetLogin(false)
      navigate("/")
    }
  }

  return (
    <div>
      <div className="mainnavcomp">
        <div className="navbarcomp">
          <div style={{display:"flex", gap:"20px"}}>
          <h2>Travel</h2>
            <input ref={inputref}  id="inputbox" type="text" placeholder="Search the Destination" />
            <button onClick={handleSearch} style={{padding: "8px 15px", borderBottomLeftRadius:"0px", borderTopLeftRadius:"0px"}}>Search</button>
          </div>
          <div style={{display:"flex", justifyContent:"center"}}>
            <button style={{marginRight:"80px", marginLeft:"80px"}} onClick={handleReset}>Reset</button>
            <button style={{marginRight:"80px"}} onClick={()=>{navigate("/")}}>Home</button>
            <button style={{marginRight:"80px"}} onClick={()=>{navigate("/dataadd")}}>Add Data</button>
            <button onClick={handleTheme}>{lightmode ? "Dark Mode" : "Light Mode"}</button>
          </div>
        </div>
      </div>
      <div className="secondNavcomp">
        <div className="pageslinknav">
          <div>
            <button onClick={()=>{navigate("/admin")}}>Admin Page</button>
          </div>
          <div>
            <button onClick={()=>{navigate("/booking")}}>Booking Page</button>
          </div>
          <div>
            <select id="filtertag" onChange={(e)=>handleFilter(e)}>
              <option value="">Filter Country</option>
              <option value="France">France</option>
              <option value="Turkey">Turkey</option>
              <option value="reset">Reset</option>
            </select>
          </div>
          <div>
            <select id="filtertagbudg" onChange={(e)=>handleBudget(e)}>
              <option value="">Filter Budget</option>
              <option value="2000">2000</option>
              <option value="2500">2500</option>
              <option value="reset">Reset</option>
            </select>
          </div>
          <div>
          <select id="sorttag" onChange={(e)=>handleSort(e)}>
              <option value="">Sort</option>
              <option value="name">Name</option>
              <option value="averageBudget">Budget</option>
              <option value="reset">Reset</option>
            </select>
          </div>
          <div>
            <button onClick={handleLogged}>{login ? "Logout" : "Login"}</button>
          </div>
          <div>
            <button onClick={()=>{navigate("/signup")}}>Signup</button>
          </div>
        </div>
      </div>  
    </div>
  );
};

