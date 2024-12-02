import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MenuBar from "./components/MenuBar";
import AdCarousel from "./components/Carousel";
import RecommendedMovies from "./components/RecommendedMovies";
import Footer from "./components/Footer";
import LiveEvents from "./components/LiveEvents";
import Premieres from "./components/Primieres";
import MusicStudios from "./components/MusicStudios";
import OutDoorEvents from "./components/OutDoorEvents";
import LaughterTherapy from "./components/LaughterTherapy";
import PapularEvents from "./components/PapularEvents";
import LatestPlay from "./components/LatestPlayes";
import LatestPlayes from "./components/LatestPlayes";
import Sports from "./components/Sports";


const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MenuBar />
      <AdCarousel />
      <RecommendedMovies />
      <LiveEvents/>
      <br/><br/><br/>
     <AdCarousel />
     <br/><br/>
     <Premieres/>
     <MusicStudios/>
     <OutDoorEvents/>
     <br/><br/><br/><br/>     

     <AdCarousel />
     
     <LaughterTherapy/>
     <PapularEvents/>
     <LatestPlayes/>
     <br/><br/><br/><br/>     

     <AdCarousel />

     <Sports/>
     


      <Footer />
    </>
  );
};

export default App;
