class Commande < ApplicationRecord
  belongs_to :article

  before_validation :set_prix_from_article
  after_save :handle_stock_and_archive
  after_save :mettre_a_jour_total_ventes

  validates :nom_personne, :adresse_livraison, :province, :telephone, presence: true
  validates :etat, inclusion: { in: ["commandé", "livraison", "versement", "annulé", "archivé"] }
  validates :nombre_articles, numericality: { greater_than: 0 }

  PROVINCES = [
    "Antananarivo", "Toamasina", "Fianarantsoa",
    "Mahajanga", "Toliara", "Antsiranana"
  ]

  # === Méthodes utilisées pour JSON ===
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

  # 🧮 Définir le prix selon l’article
  def set_prix_from_article
    if article.present? && nombre_articles.present?
      self.prix = article.prix_vente.to_f * nombre_articles.to_i
    else
      self.prix ||= 0
    end
  end

  # 🔁 Gestion du stock et archivage
  def handle_stock_and_archive
    return unless article.present?

    # ✅ Si "versement" → décrémente le reste une seule fois
    if saved_change_to_etat? && etat == "versement"
      nouveau_reste = [article.reste.to_i - nombre_articles.to_i, 0].max
      article.update!(reste: nouveau_reste)
    end

    # ✅ Si "archivé" → copier dans ArchivesCommande + supprimer la commande
    # ❌ sans recalcul du reste, car c’est déjà pris en compte
    if saved_change_to_etat? && etat == "archivé"
      ArchivesCommande.create!(
        article_id: article.id,
        nom_personne: nom_personne,
        adresse_livraison: adresse_livraison,
        province: province,
        telephone: telephone,
        prix: prix,
        remarque: remarque,
        nombre_articles: nombre_articles,
        etat: etat
      )

      # ❌ On supprime la commande originale
      self.destroy!
    end
  end

  def mettre_a_jour_total_ventes
    return unless article.present?

    # 🧠 On calcule le total des ventes en fonction du nombre d'articles vendus
    total_vendu = Commande
      .where(article_id: article.id)
      .where(etat: ["versement"])
      .sum("prix")

    article.update_column(:total_ventes, total_vendu)
  end
end
