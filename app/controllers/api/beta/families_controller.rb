class Api::Beta::FamiliesController < Api::V1::BaseController
  def index
    @families = Family.all.includes(:order)
  end
end
