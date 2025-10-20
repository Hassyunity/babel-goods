class ArchivesCommande < ApplicationRecord
  belongs_to :article, optional: true

  validates :nom_personne, :adresse_livraison, :province, :telephone, presence: true
  validates :etat, inclusion: { in: ["archivé"] }

  # Pas de callbacks : juste un enregistrement historique
end
