class Api::BirdsController < Api::BaseController
  def index
    @birds = Species.includes(family: :order)
  end
end
