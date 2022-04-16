class Api::Beta::BirdsController < Api::V1::BaseController
  def index
    @birds = Bird.all.includes(family: :order)
    @observations = current_user.observations
  end
end
