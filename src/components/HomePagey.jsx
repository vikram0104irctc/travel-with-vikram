import { useContext } from "react";
import { DataContext } from "../context/Datacontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const HomePage = ({fetchData}) => {
  let navigate = useNavigate()
  let URL = "https://sprint-1-rct-eva-default-rtdb.asia-southeast1.firebasedatabase.app";
  let {data} = useContext(DataContext)
  const handleDelete = (key) => {
    axios.delete(`${URL}/destinations/${key}.json`).then(() => {
      alert(`User With ID : ${key} Deleted.`);
      fetchData()
    });
  };

  const handleDetails = (ele) => {
    navigate('/details', { state: { ele } });
  };
  

  const handleEdit = (key, ele) => {
    let name = prompt("Enter New Name", ele.name);
    let country = prompt("Enter New country", ele.country);
    let description = prompt("Enter New description", ele.description);
    let profileImg = prompt("Enter New profileImg", ele.profileImg);
    let additionalImages = prompt(
      "Enter New additionalImages",
      ele.additionalImages[0]
    );
    let additionalImages1 = prompt(
      "Enter Second New additionalImages",
      ele.additionalImages[1]
    );
    let averageBudget = prompt("Enter New averageBudget", ele.averageBudget);
    let nobj = {
      ...ele,
      name,
      country,
      description,
      profileImg,
      additionalImages: [additionalImages, additionalImages1],
      averageBudget,
    };
    axios.patch(`${URL}/destinations/${key}.json`, nobj).then(() => {
      alert(`User Data With ID : ${key} updated Successfully`);
      fetchData()
    });
  };

  return (
    <div className="container">
      {data.map(([key, ele]) => {
        return (
          <div className="cardofplace" key={key}>
            <img src={ele.profileImg} alt={ele.name} onClick={()=>handleDetails(ele)} />
            <h2>
              <b>Place : </b>
              <i>{ele.name}</i>
            </h2>
            <p>
              <b>Country : </b>
              <i>{ele.country}</i>
            </p>
            <p>
              <b>Avg Budget : </b>
              <i>{ele.averageBudget}</i>
            </p>
            {ele.adminFlag ? (
              <div className="editdelete">
                <button onClick={() => handleEdit(key, ele)}>Edit</button>
                <button onClick={() => handleDelete(key)}>Delete</button>
                <button onClick={()=>handleDetails(ele)}>Details</button>
              </div>
            ) : (
              <div className="editdelete">
                <button onClick={()=>handleDetails(ele)}>Details</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
