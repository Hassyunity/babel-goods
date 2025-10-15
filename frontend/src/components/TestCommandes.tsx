import { useEffect, useState } from "react";
import api from "../api";
import type { Commande } from "../types";

const TestCommandes = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);

  useEffect(() => {
    api.get<Commande[]>("/commandes")
      .then((res) => setCommandes(res.data))
      .catch((err) => console.error("Erreur:", err));
  }, []);

  return (
    <div>
      <h2>Liste des Commandes</h2>
      <ul>
        {commandes.map((c) => (
          <li key={c.id}>
            {c.nom_article} — {c.prix} Ar — {c.quantite} unités
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestCommandes;
