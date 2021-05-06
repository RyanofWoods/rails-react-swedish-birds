class Order < ApplicationRecord
  validates :scientific_name, :swedish_name, presence: true
  validates :scientific_name, :swedish_name, uniqueness: true

  has_many :families
end
