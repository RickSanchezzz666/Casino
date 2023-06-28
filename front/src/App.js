import React from "react";
import './App.css';
import MainPage from "./Components/mainPage";
import Roulette from "./Components/roulette";
import { Routes, Route, BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game" element={<Roulette />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
