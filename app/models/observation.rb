class Observation < ApplicationRecord
  validates :bird, uniqueness: [scope: :user, message: 'User can only add an observation for a bird species once.']

  belongs_to :bird
  belongs_to :user

  before_save :nullify_blank_notes

  private

  def nullify_blank_notes
    self.note = note.presence
  end
end
