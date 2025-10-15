export interface Article {
  id: number;
  nom: string;
  prix_initiale: number;
  prix_vente: number;
  quantite: number;
  status: string;
  remarque?: string;
  created_at: string;
  updated_at: string;
}

export interface Commande {
  id: number;
  nom_article: string;
  article_prix_vente: number;
  quantite: number;
  prix: number;
  nom_personne?: string;
  adresse_livraison?: string;
  province?: string;
  telephone?: string;
  etat?: string;
  remarque?: string;
  created_at?: string;
  updated_at?: string;
}
