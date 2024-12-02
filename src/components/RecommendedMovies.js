import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Movies.css";

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:1141/api/movies"); // Update with your API URL
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const moviesPerSlide = 5;
  const slides = Array.from(
    { length: Math.ceil(movies.length / moviesPerSlide) },
    (_, index) =>
      movies.slice(index * moviesPerSlide, index * moviesPerSlide + moviesPerSlide)
  );

  const handleSlideChange = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
  };

  return (
    <div className="recommended-movies">
      <h2 className="section-title">Recommended Movies</h2>
      {!showAll && (
        <button style={{background:"none", color:"blue", marginTop:"-0.5rem", }} className="see-all-button" onClick={() => setShowAll(true)}>
          See All  >
        </button>
      )}
      {showAll ? (
        <div className="all-movies-grid">
          {movies.map((movie) => (
            <div key={movie._id} className="movie-item">
              <img src={movie.image} alt={movie.name} />
              <h3 className="movie-name">{movie.name}</h3>
              <p className="movie-description">{movie.description}</p>
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
              {slide.map((movie) => (
                <div key={movie._id} className="movie-item">
                  <img src={movie.image} alt={movie.name} />
                  <h3 className="movie-name">{movie.name}</h3>
                  <p className="movie-description">{movie.description}</p>
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

export default RecommendedMovies;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Movies.css';

// const LiveEvents = () => {
//   const [eventCategories, setEventCategories] = useState([]);
//   const [showAll, setShowAll] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     // Fetch event categories
//     axios
//       .get('http://localhost:1141/liveevents')
//       .then((res) => setEventCategories(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const categoriesPerSlide = 4; // Number of categories to show per slide
//   const slides = Array.from(
//     { length: Math.ceil(eventCategories.length / categoriesPerSlide) },
//     (_, index) =>
//       eventCategories.slice(
//         index * categoriesPerSlide,
//         index * categoriesPerSlide + categoriesPerSlide
//       )
//   );

//   const handleSlideChange = (newIndex) => {
//     setCurrentSlide(newIndex);
//   };

//   return (
//     <div className='recommended-movies' >
//       <h2 className="section-title">The Best Of Live Events</h2>
//       {!showAll && (
//         <button className="see-all-button" onClick={() => setShowAll(true)}>
//           See All
//         </button>
//       )}
//       {showAll ? (
//         <div className="all-movies-grid">
//           {eventCategories.map((category, index) => (
//             <div key={index} className="movie-item">
//               <img src={category.imageUrl} alt={category.name} />
//               <h3 className="movie-name">{category.name}</h3>
//               <p className="movie-description"> {category.eventCount}+ Events</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="carousel-container">
//           <div className="event-slide">
//             {slides[currentSlide]?.map((category, index) => (
//               <div key={index} className="movie-item">
//                 <img src={category.imageUrl} alt={category.name} />
//                 <h3 className="movie-name">{category.name}</h3>
//                 <p className="movie-description">{category.eventCount}+ Events</p>
//               </div>
//             ))}
//           </div>
//           {currentSlide > 0 && (
//             <button
//               className="carousel-arrow prev-arrow"
//               onClick={() => handleSlideChange(currentSlide - 1)}
//             >
//               &#8592;
//             </button>
//           )}
//           {currentSlide < slides.length - 1 && (
//             <button
//               className="carousel-arrow next-arrow"
//               onClick={() => handleSlideChange(currentSlide + 1)}
//             >
//               &#8594;
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveEvents;
