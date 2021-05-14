class Family < ApplicationRecord
  validates :scientific_name, :english_name, :swedish_name, presence: true
  validates :scientific_name, :english_name, :swedish_name, uniqueness: true

  has_many :birds
  belongs_to :order

  def birds_with_population_higher_or_equal_to(population_category = nil)
    return self.birds unless population_category

    self.birds.where('population_category <= ?', population_category.to_i)
  end
end
