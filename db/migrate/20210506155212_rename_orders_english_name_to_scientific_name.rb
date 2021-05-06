class RenameOrdersEnglishNameToScientificName < ActiveRecord::Migration[6.0]
  def change
    rename_column :orders, :english_name, :scientific_name
  end
end
