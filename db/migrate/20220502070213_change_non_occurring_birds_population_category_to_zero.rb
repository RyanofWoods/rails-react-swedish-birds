class ChangeNonOccurringBirdsPopulationCategoryToZero < ActiveRecord::Migration[6.1]
  def up
    Bird.unscoped.where(population_category: nil).update_all(population_category: 0)
  end

  def down
    Bird.unscoped.where(population_category: 0).update_all(population_category: nil)
  end
end
