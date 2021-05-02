class Observation < ApplicationRecord
  validates :bird, uniqueness: [ scope: :user, message: 'User can only add an observation for a bird species once.' ]

  belongs_to :bird
  belongs_to :user
end
