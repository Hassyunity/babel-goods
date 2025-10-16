class CreateExpeditions < ActiveRecord::Migration[8.0]
  def change
    create_table :expeditions do |t|
      t.decimal :prix
      t.datetime :date_creation
      t.text :remarque

      t.timestamps
    end
  end
end
