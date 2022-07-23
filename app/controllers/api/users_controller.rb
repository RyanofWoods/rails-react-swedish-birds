class Api::UsersController < Api::BaseController
  before_action :no_authentication_required

  def index
    render json: { isLoggedIn: signed_in? }, status: :ok
  end
end
