class AddTotalVentesToArticles < ActiveRecord::Migration[7.1]
  def change
    add_column :articles, :total_ventes, :decimal, precision: 10, scale: 2, default: 0.0, null: false
  end
end
