import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
// import "./Movies.css";

const PapularEvents = () => {
  const [papularEvents, setPapularEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPapularEvents = async () => {
      try {
        const response = await fetch("http://localhost:1141/api/papular_events"); // Update with your API URL
        const data = await response.json();
        setPapularEvents(data);
      } catch (error) {
        console.error("Error fetching out door events:", error);
      }
    };

    fetchPapularEvents();
  }, []);

  const moviesPerSlide = 5;
  const slides = Array.from(
    { length: Math.ceil(papularEvents.length / moviesPerSlide) },
    (_, index) =>
        papularEvents.slice(index * moviesPerSlide, index * moviesPerSlide + moviesPerSlide)
  );

  const handleSlideChange = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
  };

  return (
    <div style={{position:"relative", top:"4rem"}} className="recommended-movies">
      <h2 style={{marginLeft:"-6rem"}} className="section-title">Papular Events</h2>
      {!showAll && (
        <button style={{background:"none", color:"blue", marginTop:"-0.5rem", }} className="see-all-button" onClick={() => setShowAll(true)}>
          See All  >
        </button>
      )}
      {showAll ? (
        <div className="all-movies-grid">
          {papularEvents.map((papularEvents) => (
            <div key={papularEvents._id} className="movie-item">
              <img src={papularEvents.image} alt={papularEvents.title} />
              <h3 className="movie-name">{papularEvents.title}</h3>
              <p className="movie-description">{papularEvents.place}</p>
        
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
              {slide.map((papularEvents) => (
                <div key={papularEvents._id} className="movie-item">
                  <img src={papularEvents.image} alt={papularEvents.title} />
                  <h3 className="movie-name">{papularEvents.title}</h3>
                  <p className="movie-description">{papularEvents.place}</p>
                 
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

export default PapularEvents;