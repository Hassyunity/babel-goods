class CreateArticles < ActiveRecord::Migration[7.1]
  def change
    create_table :articles do |t|
      t.string  :nom, null: false
      t.decimal :prix_initiale, precision: 10, scale: 2, null: false
      t.decimal :prix_vente, precision: 10, scale: 2, null: false
      t.integer :quantite, default: 0
      t.string  :status, default: "disponible"
      t.text    :remarque

      t.timestamps
    end
  end
end
