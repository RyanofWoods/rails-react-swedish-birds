class RemoveSeenFromBirds < ActiveRecord::Migration[6.0]
  def change
    remove_column :birds, :seen, :boolean
  end
end
