class Api::Beta::BirdsController < Api::Beta::BaseController
  def index
    @birds = Bird.all.includes(family: :order)
    @observations = current_user.observations
  end
end
