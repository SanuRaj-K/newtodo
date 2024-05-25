import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
   
  return (
    <div className="">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Landing setUser={setUser} />} />
        <Route path="/home" element={<Home user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
