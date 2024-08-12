import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FormData = ({ fetchData}) => {
  let URL = "https://sprint-1-rct-eva-default-rtdb.asia-southeast1.firebasedatabase.app";
  let navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = {
      name: event.target[0].value,
      country: event.target[1].value,
      description: event.target[2].value,
      profileImg: event.target[3].value,
      additionalImages: [event.target[4].value, event.target[5].value],
      averageBudget: event.target[6].value,
      adminFlag: event.target[7].value ? true : false,
    };
    axios.post(`${URL}/destinations.json`, obj)
    .then(() => {
      alert("User Added Successfully");
      event.target[0].value = "";
      event.target[1].value = "";
      event.target[2].value = "";
      event.target[3].value = "";
      event.target[4].value = "";
      event.target[5].value = "";
      event.target[6].value = "";
      event.target[7].value = "";
      fetchData()
      navigate("/")
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <div className="formcontainer">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name of the Place" required />
          <input type="text" placeholder="Name of the Country" required />
          <input type="text" placeholder="Description" required />
          <input type="text" placeholder="Profile Image" required />
          <input type="text" placeholder="additionalImages" required />
          <input type="text" placeholder="additionalImages" required />
          <input type="text" placeholder="Average Budget" required />
          <select required>
            <option value="">Admin Acess</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <input className="sub-btn" type="submit" />
        </form>
      </div>
    </>
  );
};
