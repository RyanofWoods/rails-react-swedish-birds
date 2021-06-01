class Bird < ApplicationRecord
  validates :scientific_name, :english_name, :swedish_name, presence: true
  validates :scientific_name, :english_name, :swedish_name, uniqueness: true

  belongs_to :family
  has_many :observations

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

  def self.search_by_name(query_string, language_pref, population_threshold)
    language_pref ||= "both"
    population_threshold ||= 9
    lang = language_pref.downcase

    birds = []

    case lang
    when "en"
      birds = search_by_english_and_scientific_name(query_string)
    when "se"
      birds = search_by_swedish_and_scientific_name(query_string)
    else
      birds = search_by_all_names(query_string)
    end

    # skip birds with a population category that is not set or is rarer than given threshold
    birds = birds.select { |b| !b.population_category.nil? && b.population_category <= population_threshold.to_i }

    birds.map do |b|
      x = { scientific_name: b.scientific_name }
      x[:english_name] = b.english_name unless lang == "se"
      x[:swedish_name] = b.swedish_name unless lang == "en"
      x
    end
  end
end
