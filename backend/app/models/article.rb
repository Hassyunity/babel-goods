class Article < ApplicationRecord
  before_save :update_status

  validates :nom, :prix_initiale, :prix_vente, presence: true
  validates :quantite, numericality: { greater_than_or_equal_to: 0 }
  has_many :commandes, dependent: :destroy

  private

  def update_status
    self.status = quantite.zero? ? "épuisé" : "disponible"
  end
end
