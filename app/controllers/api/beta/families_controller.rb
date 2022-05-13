class Api::Beta::FamiliesController < Api::Beta::BaseController
  def index
    @families = Family.all.includes(:order)
  end
end
