class Order < ApplicationRecord
  validates :scientific_name, :english_name, :swedish_name, presence: true
  validates :scientific_name, :english_name, :swedish_name, uniqueness: true

  has_many :families
  has_many :species, through: :families
end
