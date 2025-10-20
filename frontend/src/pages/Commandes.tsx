import { useEffect, useState } from "react";
import api from "../api";
import "./Commandes.css";
import "./Modalnewcommande.css";

interface Article {
  id: number;
  nom: string;
  prix_vente: number;
}

interface Commande {
  id?: number;
  article_id: number;
  nom_article?: string;
  nom_personne: string;
  nombre_articles: number;
  adresse_livraison: string;
  province: string;
  prix: number;
  telephone: string;
  etat: string;
  remarque?: string;
}

const PROVINCES = [
  "Antananarivo",
  "Toamasina",
  "Fianarantsoa",
  "Mahajanga",
  "Toliara",
  "Antsiranana",
];

const Commandes = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCommande, setEditingCommande] = useState<Commande | null>(null);
  const [form, setForm] = useState<Commande>({
    article_id: 0,
    nom_personne: "",
    nombre_articles: 1,
    adresse_livraison: "",
    province: "",
    prix: 0,
    telephone: "",
    etat: "commandé",
    remarque: "",
  });

  // Charger les données
  useEffect(() => {
    fetchCommandes();
    fetchArticles();
  }, []);

  const fetchCommandes = async () => {
    const res = await api.get("/commandes");
    setCommandes(res.data);
  };

  const fetchArticles = async () => {
    const res = await api.get("/articles");
    setArticles(res.data);
  };

  // Ouvrir la modal
  const openModal = (commande?: Commande) => {
    if (commande) {
      setEditingCommande(commande);
      setForm(commande);
    } else {
      setEditingCommande(null);
      setForm({
        article_id: 0,
        nom_personne: "",
        nombre_articles: 1,
        adresse_livraison: "",
        province: "",
        prix: 0,
        telephone: "",
        etat: "commandé",
        remarque: "",
      });
    }
    setShowModal(true);
  };

  // Gérer le changement d’article
  const handleArticleChange = (articleId: number) => {
    const selected = articles.find((a) => a.id === articleId);
    setForm((prev) => ({
      ...prev,
      article_id: articleId,
      prix: selected ? selected.prix_vente : 0,
    }));
  };

  // Enregistrer la commande (POST ou PUT)
  const handleSubmit = async () => {
    try {
      if (editingCommande) {
        await api.put(`/commandes/${editingCommande.id}`, { commande: form });
      } else {
        await api.post("/commandes", { commande: form });
      }
      fetchCommandes();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement de la commande.");
    }
  };

  // Supprimer
  const deleteCommande = async (id: number) => {
    if (confirm("Supprimer cette commande ?")) {
      await api.delete(`/commandes/${id}`);
      fetchCommandes();
    }
  };

  return (
    <div className="commandes-container">
      <div className="commandes-header">
        <h2>📦 Gestion des Commandes</h2>
        <button className="create-btn" onClick={() => openModal()}>
          ➕ Nouvelle commande
        </button>
      </div>

      {commandes.length === 0 ? (
        <p className="no-orders">Aucune commande enregistrée.</p>
      ) : (
        <table className="commandes-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Client</th>
              <th>Adresse</th>
              <th>Nombre d'articles</th>
              <th>Province</th>
              <th>Prix (Ar)</th>
              <th>Téléphone</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map((c) => (
              <tr key={c.id}>
                <td>{c.nom_article}</td>
                <td>{c.nom_personne}</td>
                <td>{c.adresse_livraison}</td>
                <td>{c.nombre_articles}</td>
                <td>{c.province}</td>
                <td>{c.prix.toLocaleString()}</td>
                <td>{c.telephone}</td>
                <td>
                  <span className={`etat ${c.etat}`}>{c.etat}</span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => openModal(c)}>✏️</button>
                  <button className="btn-delete" onClick={() => deleteCommande(c.id!)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* === MODAL === */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingCommande ? "Modifier la commande" : "Nouvelle commande"}</h3>

            <div className="commande-form">
              <select
                value={form.article_id}
                onChange={(e) => handleArticleChange(Number(e.target.value))}
              >
                <option value="">-- Sélectionner un article --</option>
                {articles.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nom} ({a.prix_vente} Ar)
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Nom du client"
                value={form.nom_personne}
                onChange={(e) => setForm({ ...form, nom_personne: e.target.value })}
              />

              <input
                type="number"
                placeholder="Nombre d'articles"
                min={1}
                value={form.nombre_articles}
                onChange={(e) =>
                  setForm({ ...form, nombre_articles: Number(e.target.value) })
                }
              />

              <input
                type="text"
                placeholder="Adresse de livraison"
                value={form.adresse_livraison}
                onChange={(e) =>
                  setForm({ ...form, adresse_livraison: e.target.value })
                }
              />

              <select
                value={form.province}
                onChange={(e) => setForm({ ...form, province: e.target.value })}
              >
                <option value="">-- Choisir une province --</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Prix"
                value={form.prix}
                readOnly
              />

              <input
                type="text"
                placeholder="Téléphone"
                value={form.telephone}
                onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              />

              <select
                value={form.etat}
                onChange={(e) => setForm({ ...form, etat: e.target.value })}
              >
                <option value="commandé" disabled={form.etat === "versement"}>
                  Commandé
                </option>
                <option value="livraison" disabled={form.etat === "versement"}>
                  Livraison
                </option>
                <option value="versement">Versement</option>
                <option value="annulé" disabled={form.etat === "versement"}>
                  Annulé
                </option>
                <option value="archivé">Archivé</option>
              </select>

              <textarea
                placeholder="Remarque (optionnelle)"
                value={form.remarque}
                onChange={(e) => setForm({ ...form, remarque: e.target.value })}
              />

              <div className="modal-actions">
                <button className="save-btn" onClick={handleSubmit}>
                  💾 Enregistrer
                </button>
                <button className="cancel-btn" onClick={() => setShowModal(false)}>
                  ❌ Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Commandes;
