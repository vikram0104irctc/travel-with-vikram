import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignupPage = () => {
  let URL = "https://sprint-1-rct-eva-default-rtdb.asia-southeast1.firebasedatabase.app";
  let navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = {
      username: event.target[0].value,
      password: event.target[1].value,
      phone: event.target[2].value
    };
    axios.post(`${URL}/crediantials.json`, obj)
    .then(() => {
      alert("Signup Successfully");
      event.target[0].value = "";
      event.target[1].value = "";
      event.target[2].value = "";
      navigate("/login")
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
          <input type="password" placeholder="Password" required />
          <input type="text" placeholder="Phone No." required />
          <input className="sub-btn" type="submit" />
        </form>
      </div>
    </>
  );
};
