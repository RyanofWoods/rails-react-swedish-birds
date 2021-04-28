class CreateBirds < ActiveRecord::Migration[6.0]
  def change
    create_table :birds do |t|
      t.boolean :seen, default: false
      t.string :scientific_name
      t.string :english_name
      t.string :swedish_name
      t.references :family, null: false, foreign_key: true

      t.timestamps
    end
  end
end
