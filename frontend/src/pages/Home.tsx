import "./Home.css";
import Graph from "../components/Graph";
import CalendarSection from "../components/CalendarSection";

const Home = () => {
  return (
    <div className="home-container">
      {/* 🌟 Section Bannière */}
      <section className="brand-banner">
        <img
          src="/images/bg.png"
          alt="Babel Goods - Marque"
          className="brand-image"
        />
      </section>

      {/* 📊 Section Graphiques */}
      <Graph />

      {/* 🗓️ Section Calendrier + Commandes */}
      <CalendarSection />
    </div>
  );
};

export default Home;
