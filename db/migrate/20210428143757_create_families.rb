class CreateFamilies < ActiveRecord::Migration[6.0]
  def change
    create_table :families do |t|
      t.string :scientific_name
      t.string :english_name
      t.string :swedish_name
      t.references :order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
