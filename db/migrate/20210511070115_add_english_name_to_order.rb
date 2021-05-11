class AddEnglishNameToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :english_name, :string
  end
end
