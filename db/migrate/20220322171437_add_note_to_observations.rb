class AddNoteToObservations < ActiveRecord::Migration[6.1]
  def change
    add_column :observations, :note, :text
  end
end
