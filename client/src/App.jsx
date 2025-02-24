import React from "react";
import "./App.css";
import Players from "./pages/Players";
import { Routes, Route } from "react-router-dom";
import AddPlayer from "./pages/AddPlayer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <div>
      <NavBar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/addplayers" element={<AddPlayer />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/secretregister" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
