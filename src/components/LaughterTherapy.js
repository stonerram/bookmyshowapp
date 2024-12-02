import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
// import "./Movies.css";

const LaughterTherapy = () => {
  const [laughterTherapy, setLaughterTherapy] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchLaughterTherapy = async () => {
      try {
        const response = await fetch("http://localhost:1141/api/laughter_therapy"); // Update with your API URL
        const data = await response.json();
        setLaughterTherapy(data);
      } catch (error) {
        console.error("Error fetching out door events:", error);
      }
    };

    fetchLaughterTherapy();
  }, []);

  const moviesPerSlide = 5;
  const slides = Array.from(
    { length: Math.ceil(laughterTherapy.length / moviesPerSlide) },
    (_, index) =>
        laughterTherapy.slice(index * moviesPerSlide, index * moviesPerSlide + moviesPerSlide)
  );

  const handleSlideChange = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
  };

  return (
    <div style={{position:"relative", top:"4rem"}} className="recommended-movies">
      <h2 style={{marginLeft:"-4rem"}} className="section-title">Laughter  Therapy</h2>
      {!showAll && (
        <button style={{background:"none", color:"blue", marginTop:"-0.5rem", }} className="see-all-button" onClick={() => setShowAll(true)}>
          See All  >
        </button>
      )}
      {showAll ? (
        <div className="all-movies-grid">
          {laughterTherapy.map((laughterTherapy) => (
            <div key={laughterTherapy._id} className="movie-item">
              <img src={laughterTherapy.image} alt={laughterTherapy.title} />
              <h3 className="movie-name">{laughterTherapy.title}</h3>
              <p className="movie-description">{laughterTherapy.place}</p>
        
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
              {slide.map((laughterTherapy) => (
                <div key={laughterTherapy._id} className="movie-item">
                  <img src={laughterTherapy.image} alt={laughterTherapy.title} />
                  <h3 className="movie-name">{laughterTherapy.title}</h3>
                  <p className="movie-description">{laughterTherapy.place}</p>
                 
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

export default LaughterTherapy;