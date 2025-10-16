import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Commandes from "./pages/Commandes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/commandes" element={<Commandes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
