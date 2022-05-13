class Api::FamiliesController < Api::BaseController
  def index
    @families = Family.all.includes(:order)
  end
end
