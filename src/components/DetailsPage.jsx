import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailPagey.css"; 

export const ShowFullDetails = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { ele } = location.state;

  const allImages = [ele.profileImg, ...ele.additionalImages];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function handleBack() {
    navigate("/");
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [allImages.length]);

  return (
    <div className="slider-container">
      <div
        className="image-slider"
        style={{
          transform: `translateX(-${currentImageIndex * 107}%)`,
        }}
      >
        {allImages.map((image, index) => (
          <img key={index} src={image} alt={ele.name} className="slider-image" />
        ))}
      </div>
      <div className="detailstext">
        <h2>
          <b>Place : </b>
          <i>{ele.name}</i>
        </h2>
        <p>
          <b>Description : </b>
          <i>{ele.description}</i>
        </p>
        <p>
          <b>Avg Budget : </b>
          <i>{ele.averageBudget}</i>
        </p>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};
