import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../context/loginContext";
import { useContext } from "react";

export const LoginPage = () => {
  let {SetLogin} = useContext(LoginContext)
  let URL = "https://sprint-1-rct-eva-default-rtdb.asia-southeast1.firebasedatabase.app";
  let navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    let  username= event.target[0].value
    let  password= event.target[1].value
    axios.get(`${URL}/crediantials.json`)
    .then((res) => {
      let ndataa = Object.entries(res.data).filter(([key,ele])=>{
        return ele.username==username && ele.password==password
      })
      if (ndataa.length>0){
        alert("Login Successfully");
        SetLogin(true)
        event.target[0].value = "";
        event.target[1].value = "";
        navigate("/")
      }else{
        alert("Please Provide Valid Crediantials")
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <div className="formcontainer">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="password" required />
          <input className="sub-btn" type="submit" />
        </form>
      </div>
    </>
  );
};
