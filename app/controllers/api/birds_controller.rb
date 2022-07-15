class Api::BirdsController < Api::BaseController
  before_action :no_authentication_required, only: [:index]

  def index
    @birds = Bird.all.includes(family: :order)
    @observations = user_signed_in? ? current_user.observations : Observation.none
  end
end
