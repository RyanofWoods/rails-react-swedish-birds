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

ActiveRecord::Schema.define(version: 20_230_526_185_903) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_trgm"
  enable_extension "plpgsql"

  create_table "families", force: :cascade do |t|
    t.string "scientific_name"
    t.string "english_name"
    t.string "swedish_name"
    t.integer "order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_families_on_order_id"
  end

  create_table "observations", force: :cascade do |t|
    t.integer "species_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "note"
    t.date "observed_at"
    t.index ["species_id"], name: "index_observations_on_species_id"
    t.index ["user_id"], name: "index_observations_on_user_id"
  end

  create_table "orders", force: :cascade do |t|
    t.string "scientific_name"
    t.string "swedish_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "english_name"
  end

  create_table "species", force: :cascade do |t|
    t.string "scientific_name"
    t.string "english_name"
    t.string "swedish_name"
    t.integer "family_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "details"
    t.integer "population_category"
    t.index ["family_id"], name: "index_species_on_family_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "authentication_token", limit: 30
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "families", "orders"
  add_foreign_key "observations", "species"
  add_foreign_key "observations", "users"
  add_foreign_key "species", "families"
end
