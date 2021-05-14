class AddFieldsToBirds < ActiveRecord::Migration[6.0]
  def change
    add_column :birds, :details, :string
    add_column :birds, :population_category, :integer
  end
end
