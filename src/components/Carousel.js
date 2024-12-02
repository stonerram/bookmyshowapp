import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import './styles.css';

const AdCarousel = () => {
  const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      const response = await fetch("http://localhost:1141/api/ads");
      const data = await response.json();
      setAds(data);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Display multiple posters
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    centerMode: true, // Keep focus on the center poster
    centerPadding: "60px", // Add spacing around center poster
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {ads.map((ad, index) => (
          <div key={index} className="carousel-item">
            <img src={ad.adsposter} alt={`Ad ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const CustomPrevArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-prev-arrow" onClick={onClick}>
      &#9664;
    </button>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <button className="custom-arrow custom-next-arrow" onClick={onClick}>
      &#9654;
    </button>
  );
};

export default AdCarousel;
