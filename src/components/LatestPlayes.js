import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
// import "./Movies.css";

const LatestPlayes = () => {
  const [latestPlay, setLatestPlay] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchLatestPlay = async () => {
      try {
        const response = await fetch("http://localhost:1141/api/latest_play"); // Update with your API URL
        const data = await response.json();
        setLatestPlay(data);
      } catch (error) {
        console.error("Error fetching out door events:", error);
      }
    };

    fetchLatestPlay();
  }, []);

  const moviesPerSlide = 5;
  const slides = Array.from(
    { length: Math.ceil(latestPlay.length / moviesPerSlide) },
    (_, index) =>
        latestPlay.slice(index * moviesPerSlide, index * moviesPerSlide + moviesPerSlide)
  );

  const handleSlideChange = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
  };

  return (
    <div style={{position:"relative", top:"4rem"}} className="recommended-movies">
      <h2 style={{marginLeft:"-6rem"}} className="section-title">The Latest Play</h2>
      {!showAll && (
        <button style={{background:"none", color:"blue", marginTop:"-0.5rem", }} className="see-all-button" onClick={() => setShowAll(true)}>
          See All  >
        </button>
      )}
      {showAll ? (
        <div className="all-movies-grid">
          {latestPlay.map((latestPlay) => (
            <div key={latestPlay._id} className="movie-item">
              <img src={latestPlay.image} alt={latestPlay.title} />
              <h3 className="movie-name">{latestPlay.title}</h3>
              <p className="movie-description">{latestPlay.place}</p>
        
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
              {slide.map((latestPlay) => (
                <div key={latestPlay._id} className="movie-item">
                  <img src={latestPlay.image} alt={latestPlay.title} />
                  <h3 className="movie-name">{latestPlay.title}</h3>
                  <p className="movie-description">{latestPlay.place}</p>
                 
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

export default LatestPlayes;