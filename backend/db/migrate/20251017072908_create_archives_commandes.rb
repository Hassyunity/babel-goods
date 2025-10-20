class CreateArchivesCommandes < ActiveRecord::Migration[8.0]
  def change
    create_table :archives_commandes do |t|
      t.references :article, null: false, foreign_key: true
      t.string :nom_personne
      t.string :adresse_livraison
      t.string :province
      t.decimal :prix
      t.string :telephone
      t.string :etat
      t.text :remarque
      t.integer :nombre_articles

      t.timestamps
    end
  end
end
