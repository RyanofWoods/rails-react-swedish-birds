class Api::BirdsController < Api::BaseController
  def index
    @birds = Bird.all.includes(family: :order)
    @observations = current_user.observations
  end
end
