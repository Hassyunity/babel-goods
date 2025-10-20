class Article < ApplicationRecord
  has_many :commandes, dependent: :destroy

  before_validation :set_default_reste, on: :create
  before_save :sync_reste_with_quantite_change
  before_save :update_status

  validates :nom, :prix_initiale, :prix_vente, presence: true
  validates :quantite, :reste, numericality: { greater_than_or_equal_to: 0 }

  private

  # 🧩 Initialise `reste` à la création (égale à `quantite`)
  def set_default_reste
    self.reste = quantite if reste.nil?
  end

  # 🔄 Si on modifie la quantité manuellement, met à jour le reste
  def sync_reste_with_quantite_change
    if will_save_change_to_quantite? && (reste.nil? || reste > quantite)
      self.reste = quantite
    end
  end

  # ⚙️ Met à jour automatiquement le statut selon le stock restant
  def update_status
    self.status = reste.to_i.zero? ? "épuisé" : "disponible"
  end
end
