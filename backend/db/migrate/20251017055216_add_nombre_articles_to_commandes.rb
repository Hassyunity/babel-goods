class AddNombreArticlesToCommandes < ActiveRecord::Migration[7.1]
  def change
    add_column :commandes, :nombre_articles, :integer, default: 1, null: false
  end
end
