class CreateCommandes < ActiveRecord::Migration[7.1]
  def change
    create_table :commandes do |t|
      t.references :article, null: false, foreign_key: true
      t.string  :nom_personne, null: false
      t.string  :adresse_livraison, null: false
      t.string  :province, null: false
      t.decimal :prix, precision: 10, scale: 2, default: 0.0
      t.string  :telephone, null: false
      t.string  :etat, default: "commandé"
      t.text    :remarque

      t.timestamps
    end
  end
end
