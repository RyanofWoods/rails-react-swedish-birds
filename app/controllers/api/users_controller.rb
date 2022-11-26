class Api::UsersController < Api::BaseController
  def index
    render json: { isLoggedIn: signed_in? }, status: :ok
  end
end
