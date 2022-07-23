class Api::FamiliesController < Api::BaseController
  before_action :no_authentication_required, only: [:index]

  def index
    @families = Family.all.includes(:order)
  end
end
