import { useEffect, useState } from "react";
import api from "../api";
import "./articles.css";

interface Article {
  id: number;
  nom: string;
  prix_initiale: number;
  prix_vente: number;
  quantite: number;
  reste: number;
  status: string;
  total_ventes: number;
  remarque?: string;
  image?: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get("/articles");
        setArticles(res.data);
      } catch (error) {
        console.error("Erreur de chargement des articles :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <p className="loading">Chargement des articles...</p>;

  return (
    <div className="articles-page">
      <header id="header">
        <h1>🛍️ Listes des Articles</h1>
        {/* <p>Découvrez nos produits les plus raffinés</p> */}
      </header>

      <div className="container">
        {articles.length === 0 ? (
          <p style={{ color: "#fff", textAlign: "center" }}>
            Aucun article disponible pour le moment.
          </p>
        ) : (
          articles.map((article) => (
            <div className="card" key={article.id}>
              <div className="card-image">
                <img
                  src={`/images/${article.image || "default.jpg"}`}
                  alt={article.nom}
                />
              </div>
              <div className="card-text">
                <p className="card-meal-type">
                  Stock : {article.reste}/{article.quantite}<br></br>
                  Total de vente: {article.total_ventes}
                </p>
                <h2 className="card-title">{article.nom}</h2>
                <p className="card-body">
                  💬 {article.remarque || "Aucune remarque"}
                </p>
                <p className="card-status">
                  {article.status.toUpperCase()}
                </p>
              </div>
              <div className="card-price">
                {article.prix_vente.toLocaleString()} Ar
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Articles;
