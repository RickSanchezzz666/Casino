import React from "react";
import './App.css';
import MainPage from "./Components/mainPage";
import { Routes, Route, BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
