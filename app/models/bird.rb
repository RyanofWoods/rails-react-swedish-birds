class Bird < ApplicationRecord
  validates :scientific_name, :english_name, :swedish_name, :population_category, presence: true
  validates :scientific_name, :english_name, :swedish_name, uniqueness: true

  belongs_to :family
  has_many :observations

  default_scope { where.not(population_category: 0) }

  include PgSearch::Model
  pg_search_scope :search_by_english_and_scientific_name,
                  against: [:scientific_name, :english_name],
                  using: {
                    trigram: { word_similarity: true }
                  }
  pg_search_scope :search_by_swedish_and_scientific_name,
                  against: [:scientific_name, :swedish_name],
                  using: {
                    trigram: { word_similarity: true }
                  }
  pg_search_scope :search_by_all_names,
                  against: [:scientific_name, :english_name, :swedish_name],
                  using: {
                    trigram: { word_similarity: true }
                  }
end
