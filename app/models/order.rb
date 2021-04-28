class Order < ApplicationRecord
  validates :english_name, :swedish_name, presence: true
  validates :english_name, :swedish_name, uniqueness: true

  has_many :families
end
