class Bird < ApplicationRecord
  validates :scientific_name, :english_name, :swedish_name, presence: true
  validates :scientific_name, :english_name, :swedish_name, uniqueness: true

  belongs_to :family
  has_many :observations

  def seen?
    return nil unless user_signed_in?

    if Observation.find_by(user: current_user, bird: self)
      true
    else
      false
    end
  end
end
