class Api::UsersController < Api::BaseController
  before_action :no_authentication_required, only: [:index]

  def index
    render json: { isLoggedIn: signed_in? }, status: :ok
  end
end
