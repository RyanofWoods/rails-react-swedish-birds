class Api::SpeciesController < Api::BaseController
  def index
    @species = Species.includes(family: :order)
  end
end
