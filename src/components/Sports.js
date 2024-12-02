import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
// import "./Movies.css";

const Sports = () => {
  const [sports, setSports] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch("http://localhost:1141/api/sports_way"); // Update with your API URL
        const data = await response.json();
        setSports(data);
      } catch (error) {
        console.error("Error fetching out door events:", error);
      }
    };

    fetchSports();
  }, []);

  const moviesPerSlide = 5;
  const slides = Array.from(
    { length: Math.ceil(sports.length / moviesPerSlide) },
    (_, index) =>
        sports.slice(index * moviesPerSlide, index * moviesPerSlide + moviesPerSlide)
  );

  const handleSlideChange = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
  };

  return (
    <div style={{position:"relative", top:"4rem"}} className="recommended-movies">
      <h2 style={{marginLeft:"-6rem"}} className="section-title">Sports & Games</h2>
      {!showAll && (
        <button style={{background:"none", color:"blue", marginTop:"-0.5rem", }} className="see-all-button" onClick={() => setShowAll(true)}>
          See All  >
        </button>
      )}
      {showAll ? (
        <div className="all-movies-grid">
          {sports.map((sports) => (
            <div key={sports._id} className="movie-item">
              <img src={sports.image} alt={sports.title} />
              <h3 className="movie-name">{sports.title}</h3>
              <p className="movie-description">{sports.place}</p>
              <p className="movie-description">{sports.date}</p>

        
            </div>
          ))}
        </div>
      ) : (
        <Carousel
        activeIndex={currentSlide}
        onSelect={handleSlideChange}
        indicators={false}
        controls={false}
      >
        {slides.map((slide, slideIndex) => (
          <Carousel.Item key={slideIndex}>
            <div className="movie-slide">
              {slide.map((sports) => (
                <div key={sports._id} className="movie-item">
                  <img src={sports.image} alt={sports.title} />
                  <h3 className="movie-name">{sports.title}</h3>
                  <p className="movie-description">{sports.place}</p>
                  <p className="movie-description">{sports.date}</p>
                 
                </div>
              ))}
            </div>
            {slideIndex > 0 && (
              <button
                className="carousel-arrow prev-arrow"
                onClick={() => setCurrentSlide(slideIndex - 1)}
              >
                &#8592;
              </button>
            )}
            {slideIndex < slides.length - 1 && (
              <button
                className="carousel-arrow next-arrow"
                onClick={() => setCurrentSlide(slideIndex + 1)}
              >
                &#8594;
              </button>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
      
      )}
    </div>
  );
};

export default Sports;