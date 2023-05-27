class ChangeBirdsToSpecies < ActiveRecord::Migration[6.1]
  def change
    rename_table :birds, :species
    rename_column :observations, :bird_id, :species_id
  end
end
