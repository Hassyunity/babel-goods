import "./Apropos.css";

const Apropos = () => {
  return (
    <div className="apropos-container">
      <section className="hero">
        <h1>🛍️ Vente en ligne — Gestion simplifiée</h1>
        <p>
          Cette plateforme a été conçue pour les boutiques en ligne présentes sur <strong>Facebook</strong>, 
          afin de simplifier le <strong>suivi des ventes</strong>, la <strong>gestion des commandes</strong>,
          des <strong>articles</strong> et des <strong>coordonnées clients</strong>.
        </p>
      </section>

      <section className="mission">
        <h2>🎯 Notre objectif</h2>
        <p>
          Faciliter le quotidien des vendeurs en ligne grâce à un tableau de bord clair et rapide.
          Plus besoin de notes manuelles ou de messages éparpillés — tout est centralisé ici :
          commandes, paiements, livraisons et statistiques.
        </p>
      </section>

      <section className="features">
        <h2>🚀 Ce que vous pouvez faire</h2>
        <ul>
          <li>📦 Gérer et suivre toutes vos commandes en un seul endroit</li>
          <li>🧾 Enregistrer et modifier facilement les articles vendus</li>
          <li>📞 Organiser les coordonnées clients et les imprimer au besoin</li>
          <li>📊 Visualiser vos statistiques de ventes et de stocks en temps réel</li>
        </ul>
      </section>

      <section className="team">
        <h2>👥 À propos du projet</h2>
        <p>
          Cette application a été développée pour répondre aux besoins spécifiques des vendeurs
          Facebook à Madagascar — une solution locale, simple et moderne.
        </p>
      </section>

      {/* <section className="contact">
        <h2>📞 Contact</h2>
        <p>
          Une question, une suggestion ou un partenariat ?  
          <br />
          Écrivez-nous à <a href="mailto:support@vente-en-ligne.com">support@vente-en-ligne.com</a>
        </p>
      </section> */}
    </div>
  );
};

export default Apropos;
