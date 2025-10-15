class Commande < ApplicationRecord
  belongs_to :article

  before_validation :set_prix_from_article

  validates :nom_personne, :adresse_livraison, :province, :telephone, presence: true
  validates :etat, inclusion: { in: ["commandé", "livraison", "versement", "annulé"] }

  PROVINCES = ["Antananarivo", "Toamasina", "Fianarantsoa", "Mahajanga", "Toliara", "Antsiranana"]

  # ✅ Méthodes utilisées pour JSON
  def nom_article
    article&.nom
  end

  def article_prix_vente
    article&.prix_vente
  end

  def quantite
    article&.quantite
  end

  private

  def set_prix_from_article
    self.prix = article&.prix_vente || 0
  end
end
