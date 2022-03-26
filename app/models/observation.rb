class Observation < ApplicationRecord
  validates :bird, uniqueness: [scope: :user, message: 'User can only add an observation for a bird species once.']
  validates :observed_at, presence: { message: 'must be a Date or zero.' }

  belongs_to :bird
  belongs_to :user

  before_save :nullify_blank_notes, :format_unknown_observed_at

  UNKNOWN_OBSERVED_AT_VALUE = 0

  private

  def nullify_blank_notes
    self.note = note.presence
  end

  def format_unknown_observed_at
    self.observed_at = nil if observed_at == UNKNOWN_OBSERVED_AT_VALUE
  end
end
