class AddResteToArticles < ActiveRecord::Migration[7.1]
  def change
    add_column :articles, :reste, :integer, default: 0, null: false

    # 🧠 Initialise le reste = quantite pour les articles existants
    reversible do |dir|
      dir.up do
        Article.reset_column_information
        Article.find_each do |article|
          article.update_column(:reste, article.quantite)
        end
      end
    end
  end
end
