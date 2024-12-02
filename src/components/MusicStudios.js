import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
// import "./Movies.css";

const MusicStudios = () => {
  const [musicStudios, setMusicStudios] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchMusicStudios = async () => {
      try {
        const response = await fetch("http://localhost:1141/api/music-studio"); // Update with your API URL
        const data = await response.json();
        setMusicStudios(data);
      } catch (error) {
        console.error("Error fetching music studies:", error);
      }
    };

    fetchMusicStudios();
  }, []);

  const moviesPerSlide = 5;
  const slides = Array.from(
    { length: Math.ceil(musicStudios.length / moviesPerSlide) },
    (_, index) =>
        musicStudios.slice(index * moviesPerSlide, index * moviesPerSlide + moviesPerSlide)
  );

  const handleSlideChange = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
  };

  return (
    <div style={{position:"relative", top:"4rem"}} className="recommended-movies">
      <h2 style={{marginLeft:"-8rem"}} className="section-title">Music Studio</h2>
      {!showAll && (
        <button style={{background:"none", color:"blue", marginTop:"-0.5rem", }} className="see-all-button" onClick={() => setShowAll(true)}>
          See All  >
        </button>
      )}
      {showAll ? (
        <div className="all-movies-grid">
          {musicStudios.map((musicStudios) => (
            <div key={musicStudios._id} className="movie-item">
              <img src={musicStudios.image} alt={musicStudios.title} />
              <h3 className="movie-name">{musicStudios.title}</h3>
              <p className="movie-description">{musicStudios.venue}</p>
              <p className="movie-description">{musicStudios.course}</p>
              <p className="movie-description">{musicStudios.place}</p>
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
              {slide.map((musicStudios) => (
                <div key={musicStudios._id} className="movie-item">
                  <img src={musicStudios.image} alt={musicStudios.name} />
                  <h3 className="movie-name">{musicStudios.title}</h3>
                  <p className="movie-description">{musicStudios.venue}</p>
                  <p className="movie-description">{musicStudios.course}</p>
                  <p className="movie-description">{musicStudios.place}</p>
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

export default MusicStudios;