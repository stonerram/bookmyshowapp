import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
// import "./Movies.css";

const LiveEvents = () => {
  const [eventCategories, setEventCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const liveEvents = async () => {
      try {
        const response = await fetch("http://localhost:1141/liveevents"); // Update with your API URL
        const data = await response.json();
        setEventCategories(data); // Use data here instead of res.data
      } catch (error) {
        console.error("Error fetching events:", error); // Updated error message
      }
    };

    liveEvents();
  }, []);

  const categoriesPerSlide = 5;
  const slides = Array.from(
    { length: Math.ceil(eventCategories.length / categoriesPerSlide) },
    (_, index) =>
      eventCategories.slice(
        index * categoriesPerSlide,
        index * categoriesPerSlide + categoriesPerSlide
      )
  );

  const handleSlideChange = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
  };

  return (
    <div className="recommended-movies">
      <h2 className="section-title">The Best Of Live Events</h2>
      {!showAll && (
        <button style={{background:"none", color:"blue", marginTop:"-1rem"}} className="see-all-button" onClick={() => setShowAll(true)}>
          See All  >
        </button>
      )}
      {showAll ? (
        <div className="all-movies-grid">
          {eventCategories.map((eventCategory) => (
            <div key={eventCategory._id} className="movie-item">
              <img src={eventCategory.imageUrl} alt={eventCategory.name} />
              <h3 className="movie-name">{eventCategory.name}</h3>
              <p className="movie-description">{eventCategory.eventCount}+ Events</p>
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
                {slide.map((eventCategory) => (
                  <div key={eventCategory._id} className="movie-item">
                    <img
                      src={eventCategory.imageUrl}
                      alt={eventCategory.name}
                    />
                    <h3 className="movie-name">{eventCategory.name}</h3>
                    <p className="movie-description">
                      {eventCategory.eventCount}+ Events
                    </p>
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

export default LiveEvents;
