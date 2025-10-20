import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../api";
import "./Navbar.css";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [capital, setCapital] = useState<number | null>(null);
  const [nbCommandes, setNbCommandes] = useState<number>(0);

  useEffect(() => {
    api.get("/stats/capital_total")
      .then((res) => setCapital(res.data.capital))
      .catch(console.error);

    api.get("/commandes")
      .then((res) => setNbCommandes(res.data.length))
      .catch(console.error);
  }, []);

  // 📄 Génération du PDF selon le type demandé
  const handleExport = async (type: string) => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString("fr-FR");

    // En-tête
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Babel Goods — Export ${type.toUpperCase()}`, 20, 20);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Généré le ${today}`, 20, 28);

    try {
      if (type === "articles") {
        const res = await api.get("/articles");
        const data = res.data;

        autoTable(doc, {
          startY: 35,
          head: [[
            "Nom",
            "Prix initial",
            "Prix vente",
            "Quantité",
            "Statut",
            "Remarque",
            "Créé le",
            "Mis à jour"
          ]],
          body: data.map((a: any) => [
            a.nom,
            `${Number(a.prix_initiale).toLocaleString("fr-FR")} Ar`,
            `${Number(a.prix_vente).toLocaleString("fr-FR")} Ar`,
            a.quantite ?? "-",
            a.status,
            a.remarque || "-",
            new Date(a.created_at).toLocaleDateString("fr-FR"),
            new Date(a.updated_at).toLocaleDateString("fr-FR"),
          ]),
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: { fillColor: [250, 204, 21], textColor: 0 },
        });
      }

      if (type === "commandes") {
        const res = await api.get("/commandes");
        const data = res.data;
        autoTable(doc, {
          startY: 35,
          head: [["Client", "Adresse", "Téléphone", "Prix", "État"]],
          body: data.map((c: any) => [
            c.nom_personne,
            c.adresse_livraison,
            c.telephone,
            `${Number(c.prix).toLocaleString("fr-FR")} Ar`,
            c.etat,
          ]),
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: { fillColor: [250, 204, 21], textColor: 0 },
        });
      }

      if (type === "etat-vente") {
        const res = await api.get("/stats/etat_vente");
        const data = res.data;
        autoTable(doc, {
          startY: 35,
          head: [["Article", "Quantité vendue", "Total"]],
          body: data.map((v: any) => [
            v.article_nom,
            v.quantite,
            `${Number(v.total).toLocaleString("fr-FR")} Ar`,
          ]),
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: { fillColor: [250, 204, 21], textColor: 0 },
        });
      }

      if (type === "clients") {
        const res = await api.get("/commandes");
        const data = res.data;
        autoTable(doc, {
          startY: 35,
          head: [["Nom", "Téléphone", "Adresse", "Province"]],
          body: data.map((c: any) => [
            c.nom_personne,
            c.telephone,
            c.adresse_livraison,
            c.province,
          ]),
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: { fillColor: [250, 204, 21], textColor: 0 },
        });
      }

      // ✅ Pied de page
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(
          `© Babel Goods — ${today} | Page ${i}/${pageCount}`,
          20,
          doc.internal.pageSize.height - 10
        );
      }

      // ✅ Téléchargement
      doc.save(`export_${type}_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (err) {
      console.error("Erreur export PDF :", err);
    }
  };

  return (
    <nav className="navbar">
      {/* === GAUCHE === */}
      <div className="navbar-left">
        <img src="/logo.svg" alt="Babel Logo" className="navbar-logo" />
        <span className="navbar-title">Babel Goods</span>

        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/commandes">Commandes</Link></li>
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="/apropos">À propos</Link></li>
        </ul>
      </div>

      {/* === CENTRE === */}
      <div className="navbar-center">
        <div
          className="export-dropdown"
          onMouseEnter={() => setOpenDropdown(true)}
          onMouseLeave={() => setOpenDropdown(false)}
        >
          <button className="export-btn">Export ⬇</button>
          {openDropdown && (
            <ul className="export-menu">
              <li onClick={() => handleExport("articles")}>Articles</li>
              <li onClick={() => handleExport("commandes")}>Commandes</li>
              <li onClick={() => handleExport("etat-vente")}>État de vente</li>
              <li onClick={() => handleExport("clients")}>Coordonnées clients</li>
            </ul>
          )}
        </div>
      </div>

      {/* === DROITE === */}
      <div className="navbar-right">
        <div className="stats-display">
          {capital !== null && (
            <div className="stat-item">💰 {capital.toLocaleString()} Ar</div>
          )}
          <div className="notif-container">
            <span className="notif-icon">🛒</span>
            {nbCommandes > 0 && <span className="notif-badge">{nbCommandes}</span>}
          </div>
        </div>

        <a
          href="https://web.facebook.com/profile.php?id=61559545624059&locale=fr_FR"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img src="/fb-logo.svg" alt="Facebook" />
        </a>
        <button className="login-btn">Log</button>
      </div>
    </nav>
  );
};

export default Navbar;
