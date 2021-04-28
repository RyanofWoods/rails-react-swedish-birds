class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.string :english_name
      t.string :swedish_name

      t.timestamps
    end
  end
end
