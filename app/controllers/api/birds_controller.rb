class Api::BirdsController < Api::BaseController
  def index
    @birds = Bird.includes(family: :order)
  end
end
