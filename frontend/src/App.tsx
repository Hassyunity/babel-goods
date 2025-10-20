import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Commandes from "./pages/Commandes";
import Articles from "./pages/Articles";
import Apropos from "./pages/Apropos";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/commandes" element={<Commandes />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/apropos" element={<Apropos />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
