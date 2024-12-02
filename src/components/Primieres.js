// import React, { useEffect, useState } from "react";
// import { Carousel } from "react-bootstrap";
// // import "./Movies.css";

// const LiveEvents = () => {
//   const [premieres, setPremieres] = useState([]);
//   const [showAll, setShowAll] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const fetchPremieres = async () => {
//       try {
//         const response = await fetch("http://localhost:1141/api/premieres"); // Updated API URL
//         const data = await response.json();
//         setPremieres(data); // Use premieres here
//       } catch (error) {
//         console.error("Error fetching premieres:", error); // Updated error message
//       }
//     };

//     fetchPremieres();
//   }, []);

//   const premieresPerSlide = 5;
//   const slides = Array.from(
//     { length: Math.ceil(premieres.length / premieresPerSlide) },
//     (_, index) =>
//       premieres.slice(
//         index * premieresPerSlide,
//         index * premieresPerSlide + premieresPerSlide
//       )
//   );

//   const handleSlideChange = (selectedIndex) => {
//     setCurrentSlide(selectedIndex);
//   };

//   return (
//     <div className="recommended-moviesp">
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
//         <img
//           src="./images/primirers logo.png"
//           alt="Premieres Logo"
//           style={{ marginRight: "1rem", marginLeft: "2.5rem", width: "50px", height: "50px" }}
//         />
//         <h2 className="section-title" style={{ margin: 0 }}>
//           The Best Of Premieres
//         </h2>
//       </div>
//       {!showAll && (
//         <button className="see-all-button" onClick={() => setShowAll(true)}>
//           See All
//         </button>
//       )}
//       {showAll ? (
//         <div className="all-movies-grid">
//           {premieres.map((premiere) => (
//             <div key={premiere._id} className="movie-item">
//               <img src={premiere.imageURL} alt={premiere.title} />
//               <div className="premiere-info">
//                 <h2>{premiere.title}</h2>
//                 <p>{premiere.language}</p>
//                 {premiere.is4K && <span className="badge">4K AVAILABLE</span>}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <Carousel
//           activeIndex={currentSlide}
//           onSelect={handleSlideChange}
//           indicators={false}
//           controls={false}
//         >
//           {slides.map((slide, slideIndex) => (
//             <Carousel.Item key={slideIndex}>
//               <div className="movie-slide">
//                 {slide.map((premiere) => (
//                   <div key={premiere._id} className="movie-item">
//                     <img src={premiere.imageURL} alt={premiere.title} />
//                     <div className="premiere-info">
//                       <h2>{premiere.title}</h2>
//                       <p>{premiere.language}</p>
//                       {premiere.is4K && <span className="badge">4K AVAILABLE</span>}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {slideIndex > 0 && (
//                 <button
//                   className="carousel-arrow prev-arrow"
//                   onClick={() => setCurrentSlide(slideIndex - 1)}
//                 >
//                   &#8592;
//                 </button>
//               )}
//               {slideIndex < slides.length - 1 && (
//                 <button
//                   className="carousel-arrow next-arrow"
//                   onClick={() => setCurrentSlide(slideIndex + 1)}
//                 >
//                   &#8594;
//                 </button>
//               )}
//             </Carousel.Item>
//           ))}
//         </Carousel>
//       )}
//     </div>
//   );
// };

// export default LiveEvents;


import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
// import "./Movies.css";

const LiveEvents = () => {
  const [premieres, setPremieres] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPremieres = async () => {
      try {
        const response = await fetch("http://localhost:1141/api/premieres"); // Updated API URL
        const data = await response.json();
        setPremieres(data); // Use premieres here
      } catch (error) {
        console.error("Error fetching premieres:", error); // Updated error message
      }
    };

    fetchPremieres();
  }, []);

  const premieresPerSlide = 5;
  const slides = Array.from(
    { length: Math.ceil(premieres.length / premieresPerSlide) },
    (_, index) =>
      premieres.slice(
        index * premieresPerSlide,
        index * premieresPerSlide + premieresPerSlide
      )
  );

  const handleSlideChange = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
  };

  return (
    <div className="recommended-moviesp">
      <div style={{display: "flex", alignItems: "center", marginBottom: "1rem"}}>
      <img src="./images/primirers logo.png" alt="" 
       style={{  marginLeft: "-0.5rem", width: "150px", height: "150px" }}
      />
      <h2  style={{  marginLeft: "27rem", color:"crimson", fontSize:"3rem"  }} className="section-title">The Best Of Premieres</h2>
      </div>
      {!showAll && (
        <button style={{background:"none", color:"crimson", marginTop:"2.5rem"
        }} className="see-all-button" onClick={() => setShowAll(true)}>
          See All  >
        </button>
      )}
      {showAll ? (
        <div className="all-movies-grid">
          {premieres.map((premiere) => (
            <div key={premiere._id} className="movie-item">
              <img src={premiere.imageURL} alt={premiere.title} />
              <div className="premiere-info">
              <h2>{premiere.title}</h2>
              <p>{premiere.language}</p>
              {premiere.is4K && <span className="badge">4K AVAILABLE</span>}
            </div>
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
                {slide.map((premiere) => (
                  <div key={premiere._id} className="movie-item">
                    <img src={premiere.imageURL} alt={premiere.title} />
                    <div className="premiere-info">
              <h2>{premiere.title}</h2>
              <p>{premiere.language}</p>
              {premiere.is4K && <span className="badge">4K AVAILABLE</span>}
            </div>
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