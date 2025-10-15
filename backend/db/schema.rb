# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_14_185643) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "nom", null: false
    t.decimal "prix_initiale", precision: 10, scale: 2, null: false
    t.decimal "prix_vente", precision: 10, scale: 2, null: false
    t.integer "quantite", default: 0
    t.string "status", default: "disponible"
    t.text "remarque"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "commandes", force: :cascade do |t|
    t.bigint "article_id", null: false
    t.string "nom_personne", null: false
    t.string "adresse_livraison", null: false
    t.string "province", null: false
    t.decimal "prix", precision: 10, scale: 2, default: "0.0"
    t.string "telephone", null: false
    t.string "etat", default: "commandé"
    t.text "remarque"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id"], name: "index_commandes_on_article_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "commandes", "articles"
end
